// Import the built-in Node.js module 'fs' (File System) to read and interact with files on the computer.
import * as fs from "fs";
// Import the built-in Node.js module 'path' to easily build file paths that work on any operating system (Windows/Mac/Linux).
import * as path from "path";

/**
 * Represents a file attachment to be sent via email.
 */
// Define a structure called 'Attachment' so our code knows what an attachment should look like.
export interface Attachment {
    // The name of the file (for example, 'screenshot.png').
    filename: string;
    // The exact location of the file on the computer.
    path: string;
}

// Export the AttachmentCollector class so it can be used in other parts of our framework.
export class AttachmentCollector {
    /**
     * Recursively scans a directory for specific file types (.png, .zip) 
     * and collects them as email attachments.
     */
    // Define a function that takes a directory path and returns a list of Attachments.
    static collect(directoryPath: string): Attachment[] {
        // Create an empty list to hold the attachments we find.
        const attachments: Attachment[] = [];

        // Check if the directory actually exists on the computer.
        if (!fs.existsSync(directoryPath)) {
            // If it doesn't exist, print a warning in the console so we know.
            console.warn(`DIRECTORY NOT FOUND FOR ATTACHMENTS: ${directoryPath}`);
            // Return the empty list since there's nothing to collect.
            return attachments;
        }

        /**
         * Recursive helper function to traverse directories.
         */
        // Create a mini-function that looks inside a folder.
        function walk(dir: string) {
            // Get a list of everything inside the folder and look at them one by one.
            for (const file of fs.readdirSync(dir)) {
                // Combine the folder path and the file name to get the full exact path.
                const full = path.join(dir, file);
                
                // Check if this item is actually another folder.
                if (fs.statSync(full).isDirectory()) {
                    // If it is another folder, run this exact same process on that new folder (this is called recursion).
                    walk(full);
                } else {
                    // If it is a normal file, check if it is a PNG image or a ZIP file.
                    if (file.endsWith(".png") || file.endsWith(".zip")) {
                        // If it is, add it to our list of attachments!
                        attachments.push({
                            filename: file,
                            path: full
                        });
                    }
                }
            }
        }

        // Start the scanning process using the main directory path we provided.
        walk(directoryPath);
        
        // Give back the final list of collected attachments.
        return attachments;
    }
}
