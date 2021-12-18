const current_ver = "v3"

fetch('https://github.com/0x454d505459/rednote/releases')
.then(r => r.text())
.then(text => {
    let latest_ver = text.match(/<span class="ml-1 wb-break-all">\n*\s*v\d/g)[0].replace('<span class="ml-1 wb-break-all">', '').replace(/\s||\n/g, '')
    if (latest_ver != current_ver) {
        alert(`Update ${latest_ver} is now out on github!\nYour current version: ${current_ver}`)
    }
})