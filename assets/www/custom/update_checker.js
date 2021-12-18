const current_ver = "v3"

fetch('https://raw.githubusercontent.com/0x454d505459/rednote/main/version.info')
.then(r => r.text())
.then( version => {
    if (version !== current_ver) {
        alert("New update is available on github!")
    }
})