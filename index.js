const app = require("./app");

const args = process.argv.slice(2);
const command = args[0];
const target = args[1];

switch (command) {
    case "make-folder":
        app.makeFolder()
        break;

    case "make-file":
        const fileName = target;
        const fileContent = args[2] || '';
        app.makeFile(fileName, fileContent);
        break;

    case "ext-sorter":
        const folderToSort = target || 'unorganize_folder'; 
        app.sortByExtension(folderToSort);
        break;

    case "read-folder":
        app.readFolder(target);
        break;
    
    case "read-file":
        const filePath = target;
        app.readFile(filePath);
        break;

    default:
        throw Error("Invalid command")
        break;
}
 

