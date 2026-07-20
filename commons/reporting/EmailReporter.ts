// Import the file system module so we can read attachments from the computer.
import * as fs from "fs";
// Import dotenv so we can read the secret passwords and IDs from the .env file.
import * as dotenv from "dotenv";

// Tell dotenv to look for the .env file and load it into memory.
dotenv.config();

// Export the EmailReporter class so our framework can use it to send emails.
export class EmailReporter {
    /**
     * Exchanges the OAuth 2.0 refresh token for a fresh short-lived access token.
     */
    // A private function that logs into Microsoft behind the scenes to get a temporary VIP pass (access token).
    private static async getAccessToken(): Promise<string> {
        // Read the Client ID from our hidden .env file.
        const clientId = process.env.GRAPH_CLIENT_ID;
        // Read the Client Secret (password) from our hidden .env file.
        const clientSecret = process.env.GRAPH_CLIENT_SECRET;
        // Read the Tenant ID, or default to 'common' if using a personal account.
        const tenantId = process.env.GRAPH_TENANT_ID || "common";
        // Read the long-lasting Refresh Token from the .env file.
        const refreshToken = process.env.GRAPH_REFRESH_TOKEN;

        // Make sure none of these secrets are missing before we try to log in.
        if (!clientId || !clientSecret || !refreshToken) {
            // If something is missing, stop the program and throw an error.
            throw new Error("Missing Microsoft Graph API credentials in environment variables.");
        }

        // Create an empty "form" to hold the login details we are about to send to Microsoft.
        const params = new URLSearchParams();
        // Add the Client ID to the form.
        params.append('client_id', clientId);
        // Add the Secret Password to the form.
        params.append('client_secret', clientSecret);
        // Add the Refresh Token to the form.
        params.append('refresh_token', refreshToken);
        // Tell Microsoft that we are using a refresh token to log in.
        params.append('grant_type', 'refresh_token');
        // Tell Microsoft we specifically need permission to send emails (Mail.Send) via Graph API.
        params.append('scope', 'https://graph.microsoft.com/Mail.Send offline_access');

        // Send a POST request (submit the form) to the Microsoft Login server.
        const response = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
            method: 'POST', // Send data
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, // Tell the server this is a standard form
            body: params // Attach our form data
        });

        // Convert Microsoft's response into a readable Javascript object.
        const data = await response.json();

        // If Microsoft says no (e.g. invalid password), throw an error.
        if (!response.ok) {
            throw new Error(`Failed to get access token: ${data.error_description || JSON.stringify(data)}`);
        }

        // If successful, hand back the VIP pass (access token).
        return data.access_token;
    }

    /**
     * Sends the test execution report email containing the HTML summary and attachments.
     */
    // The main function that takes our HTML email code and any attachments (zip/png) and sends the email.
    static async send(html: string, attachments: any[]): Promise<void> {
        try {
            // Print a message to let the user know we are starting the email process.
            console.log("PREPARING TO SEND EXECUTION REPORT EMAIL VIA GRAPH API...");
            
            // Get our VIP pass (access token) by running the login function above.
            const accessToken = await this.getAccessToken();

            // Loop through all our attachments to format them for Microsoft Graph.
            const graphAttachments = attachments.map(att => {
                // Read the actual file data from the computer and convert it to Base64 (a text-based format for files).
                const contentBytes = fs.readFileSync(att.path, { encoding: 'base64' });
                
                // Set a default file type just in case.
                let contentType = 'application/octet-stream';
                
                // If the file is a PNG image, label it as an image.
                if (att.filename.endsWith('.png')) contentType = 'image/png';
                // If it is an HTML file, label it as HTML.
                else if (att.filename.endsWith('.html')) contentType = 'text/html';
                // If it is a ZIP folder, label it as a ZIP file.
                else if (att.filename.endsWith('.zip')) contentType = 'application/zip';
                
                // Return the attachment packaged perfectly for Microsoft.
                return {
                    "@odata.type": "#microsoft.graph.fileAttachment", // Tell Graph this is a file
                    "name": att.filename, // Give it a name
                    "contentType": contentType, // Tell it the file type
                    "contentBytes": contentBytes // Provide the actual Base64 file data
                };
            });

            // Build the final email package (the envelope and letter combined).
            const emailPayload = {
                message: {
                    // Set the subject line of the email.
                    subject: "Playwright M&G Components - UI Automation Report",
                    body: {
                        // Tell Microsoft the email body is written in HTML.
                        contentType: "HTML",
                        // Pass in the actual HTML code we generated earlier.
                        content: html
                    },
                    toRecipients: [
                        {
                            emailAddress: {
                                // The email address we are sending this to.
                                address: "balu.m@merkle.com" 
                            }
                        }
                    ],
                    // Attach the files we prepared above.
                    attachments: graphAttachments
                },
                // Tell Microsoft to save a copy of this in our Sent folder.
                saveToSentItems: "true"
            };

            // Send a POST request to Microsoft Graph to actually dispatch the email.
            const response = await fetch('https://graph.microsoft.com/v1.0/me/sendMail', {
                method: 'POST', // Send data
                headers: {
                    // Show our VIP pass (access token) to prove we are allowed to send emails.
                    'Authorization': `Bearer ${accessToken}`,
                    // Tell Microsoft the data we are sending is formatted as JSON.
                    'Content-Type': 'application/json'
                },
                // Attach our final email package.
                body: JSON.stringify(emailPayload)
            });

            // If Microsoft rejects the email for any reason, throw an error.
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Graph API returned ${response.status}: ${errorData}`);
            }

            // If we made it this far, the email sent successfully! Let the user know.
            console.log("EXECUTION REPORT EMAIL SENT SUCCESSFULLY!");
        } catch (error) {
            // If anything goes wrong at any point, catch the error and print it out.
            console.error("FAILED TO SEND EMAIL REPORT:", error);
        }
    }
}
