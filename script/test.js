const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`)
    console.log(el)
}

const synonyms = ['Hello', 'Hi', "valo jinis"]
createElements(synonyms.join(" "));