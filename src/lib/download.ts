import fs from 'fs'
import https from 'https'

export async function downloadFile() {
    try {
        return await new Promise((resolve, reject) => {
            https.get('https://www.sdy329.com/rules.json', response => {
                const code = response.statusCode ?? 0

                if (code >= 400) {
                    return reject(new Error(response.statusMessage))
                }

                const fileWriter = fs
                    .createWriteStream('./src/lib/rules.json')
                    .on('finish', () => {
                        resolve({})
                    })

                response.pipe(fileWriter)
            }).on('error', error => {
                console.log(error);
                reject(error)
            })
        })
    } catch (error) {

    }
}