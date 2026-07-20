import {test, expect, request} from '@playwright/test'
import config from '../../config/config.json' with {type:'json'}

export class APICommons {
    private requestContext : any;
    private response : any;

    //Method to create request context (Adding base URL, headers and authorization details)

    async initializeRequestContext(){
        this.requestContext = await request.newContext({
            baseURL : config.api.base_url,
            extraHTTPHeaders:{
                'Authorization' : config.api.token,
                'Content-Type' : 'application/json',
                'X-Github-Api-Version' : '2026-03-10'
            }   

    });

}

async getResponse(requestType: string, endpoint: string, requestBody?: any){
     
    switch(requestType.toLowerCase()){
        case 'get':
            this.response = await this.requestContext.get(endpoint);
            break;

        case 'post':
            this.response = await this.requestContext.post(endpoint, {data: requestBody});
            break;  

        case 'put':
            this.response = await this.requestContext.put(endpoint, {data: requestBody});
            break;   

        case 'patch':
            this.response = await this.requestContext.patch(endpoint, {data: requestBody});
            break;     
            
         case 'delete':
            this.response = await this.requestContext.delete(endpoint);
            break;   
            
         default:
            throw new Error(`Unsupported request type ${requestType}`);  


    }

    console.log(await this.response.json());

    }

    async validateStatusCode(expectedStatusCode : number){
        const actualStatusCode = this.response.status();
        expect(actualStatusCode).toBe(expectedStatusCode);
    }

    async validateStatusMessage(expectedStatusMessage : string){
        const actualStatusMessage = this.response.statusText();
        expect(actualStatusMessage).toBe(expectedStatusMessage);
    }

    
    
    
    async validateResponseBody(path: string, expectedValue: any) {
    const responseBody = await this.response.json();

    // Case 1: Simple top-level key (no dot or array notation)
    if (!path.includes('.') && !path.includes('[')) {
        const actualValue = responseBody[path];
        expect(actualValue).toBe(expectedValue);
        return;
    }

    // Case 2: Nested path (dot or array notation)
    // Convert array notation to dot notation: errors[0].message → errors.0.message
    const parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');
    let actualValue: any = responseBody;

    for (const part of parts) {
        actualValue = actualValue[part];
        if (actualValue === undefined) {
            throw new Error(`Path ${path} not found in response`);
        }
    }

    expect(actualValue).toBe(expectedValue);
}


    async validateResponseHeader(headerKey: string, expectedHeaderValue: string){

        const responseHeaders = await this.response.headers();
        const actualHeaderValue = responseHeaders[headerKey.toLowerCase()];
        expect(actualHeaderValue).toBe(expectedHeaderValue);

    }

    //Method to validate schema of the response body
    async validateResponseSchema(key:string, expectedType:string){
        const responseBody = await this.response.json();
        const actualValue = responseBody[key.toLowerCase()];
        const type = typeof actualValue;
        expect(type).toBe(expectedType);

    }


    //Method to validate the response cookies
    async validateResponseCookies(cookiename : string, expectedCookieValue : string){
        const cookies = await this.response.cookies();
        const actualCookieValue = cookies[cookiename.toLowerCase()];
        expect(actualCookieValue).toBe(expectedCookieValue);
    }


    // Method to validate response time
    async validateResponseTime(maxAllowedMs: number) {
        const actualResponseTime = this.response.timing().responseEnd - this.response.timing().startTime;
        console.log(`RESPONSE TIME: ${actualResponseTime} MS`);
        expect(actualResponseTime).toBeLessThanOrEqual(maxAllowedMs);
    }



}