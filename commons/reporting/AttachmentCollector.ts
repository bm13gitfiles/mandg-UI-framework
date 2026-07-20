import * as fs from "fs";
import * as path from "path";

export interface Attachment {
    filename: string;
    path: string;
}

export class AttachmentCollector {
    static collect(directoryPath: string): Attachment[] {
        const attachments: Attachment[] = [];

        if (!fs.existsSync(directoryPath)) {
            console.warn(`DIRECTORY NOT FOUND FOR ATTACHMENTS: ${directoryPath}`);
            return attachments;
        }

        function walk(dir: string) {
            for (const file of fs.readdirSync(dir)) {
                const full = path.join(dir, file);
                if (fs.statSync(full).isDirectory()) {
                    walk(full);
                } else {
                    if (file.endsWith(".png") || file.endsWith(".zip")) {
                        attachments.push({
                            filename: file,
                            path: full
                        });
                    }
                }
            }
        }

        walk(directoryPath);
        return attachments;
    }
}
