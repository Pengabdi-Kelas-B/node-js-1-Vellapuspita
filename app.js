const fs = require("node:fs")
const readline = require('node:readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = {};

// contoh script pembuatan folder
 app.makeFolder = () => {
    rl.question("Masukan Nama Folder : ",(folderName) => {
        fs.mkdir(__dirname + `/${folderName}`,() => {
            console.log("success created new folder");
            
        })
        rl.close()
    })
} 

app.makeFile = () => {
    rl.question("Masukan Nama File (termasuk ekstensi, misal: file.txt): ", (fileName) => {
        rl.question("Masukan Isi File: ", (content) => {
            fs.writeFile(__dirname + `/${fileName}`, content, (err) => {
                if (err) {
                    console.error("Error creating file:", err);
                } else {
                    console.log(`File ${fileName} berhasil dibuat.`);
                }
                rl.close();
            });
        });
    });
};

app.sortByExtension = (folderName) => {
    const folderPath = __dirname + `/${folderName}`;
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error("Error reading folder:", err);
            return;
        }
        
        files.forEach(file => {
            const ext = file.split('.').pop(); // Ambil ekstensi
            const targetFolder = `${folderPath}/${ext}_folder`;
            const sourceFile = `${folderPath}/${file}`;
            const targetFile = `${targetFolder}/${file}`;

            // Cek apakah folder untuk ekstensi sudah ada, jika tidak buat
            if (!fs.existsSync(targetFolder)) {
                fs.mkdirSync(targetFolder);
            }

            fs.rename(sourceFile, targetFile, (err) => {
                if (err) {
                    console.error(`Error moving file ${file}:`, err);
                } else {
                    console.log(`File ${file} dipindahkan ke folder ${ext}_folder`);
                }
            });
        });
    });
};

app.readFolder = (folderName) => {
    const folderPath = __dirname + `/${folderName}`;
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error("Error reading folder:", err);
            return;
        }

        const fileDetails = files.map(file => {
            const filePath = `${folderPath}/${file}`;
            const stats = fs.statSync(filePath);
            return {
                namaFile: file,
                extensi: file.split('.').pop(),
                jenisFile: file.endsWith('.jpg') ? 'gambar' : 'text',
                tanggalDibuat: stats.birthtime.toLocaleDateString(),
                ukuranFile: `${(stats.size / 1024).toFixed(2)}kb`
            };
        });

        console.log(`Berhasil menampilkan isi dari folder ${folderName}:`, JSON.stringify(fileDetails, null, 2));
    });
};

app.readFile = (filePath) => {
    const fullPath = __dirname + `/${filePath}`; // Buat path lengkap

    fs.readFile(fullPath, 'utf-8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }
        console.log(`Isi dari file ${filePath}:\n`);
        console.log(data);
    });
};


module.exports = app