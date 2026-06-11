const inputbox = document.getElementById('inputbox');
const totalCharactersDisplay = document.getElementById('totalCharactersDisplay')
const wordCountDisplay = document.getElementById('wordCountDisplay')
const spacesCheckbox = document.getElementById('spacesCheckbox')
const sentenceCountDisplay = document.getElementById('sentenceCountDisplay')
const inputLimit = document.getElementById('inputLimit');
const characterLimitCount = document.getElementById('characterLimitCount')
const warningPara = document.querySelector('.warning-para')
const readingTimeDisplay = document.getElementById('readingTimeDisplay')
const inputLimitCheckbox = document.getElementById('inputLimitCheckbox')
const inplimitDiv = document.querySelector('.input-limit')
const densityList = document.getElementById('densityList')

let inpLimitValue = 0;
const readTotalCharactersPerMinute = 500;
let inputLimitCheckboxValue = "";
let excludeCheckbox = "";


inputLimit.addEventListener('input', (e) => {
    inpLimitValue = e.target.value;
    const impv = inputbox.maxLength = inpLimitValue
    characterLimitCount.innerText = inpLimitValue
})

inputLimitCheckbox.addEventListener("input", (e) => {
    inputLimitCheckboxValue = e.target.checked;
    if (inputLimitCheckboxValue) {
        inplimitDiv.classList.add('active')
    } else {
        inplimitDiv.classList.remove('active')
    }
})

function checkbox() {
    if (excludeCheckbox) {
        const excludeSpace = inputbox.value.split(' ')
        const excludedSpaces = excludeSpace.filter((s) => {
            return s;
        })
        const charWithoutSpaces = excludedSpaces.join('')
        totalCharactersDisplay.innerText = charWithoutSpaces.length
    } else {
        totalCharacters = inputbox.value.length
        totalCharactersDisplay.innerText = totalCharacters
    }

}
spacesCheckbox.addEventListener('input', (e) => {
    excludeCheckbox = e.target.checked;
    checkbox()
})

inputbox.addEventListener('input', (e) => {
    const inputValue = e.target.value

    checkbox()
    // input limit warning 
    if (inpLimitValue > 0 && inpLimitValue <= totalCharacters && inputLimitCheckboxValue) {
        warningPara.classList.add('active')
    } else {
        warningPara.classList.remove('active')
    }

    let spaces = inputValue.split(' ')
    const filteredSpaces = spaces.filter((space) => {
        return space != ""
    })
    wordCountDisplay.innerText = filteredSpaces.length

    const sentences = inputValue.split('.')
    const filteredSentences = sentences.filter((sentence) => {
        return sentence
    })
    sentenceCountDisplay.innerText = filteredSentences.length


    let wpm = inputValue.length / readTotalCharactersPerMinute
    // console.log(Math.ceil(wpm))
    readingTimeDisplay.innerText = Math.ceil(wpm);


    // letter density filter
    var count = 0
    const inputArrayValues = inputValue.split('');
    const letterDensity = {};

    inputArrayValues.forEach((value) => {
        const upperCaseValue = value.toUpperCase();

        if (letterDensity[upperCaseValue]) {
            letterDensity[upperCaseValue].count++;
        } else {
            letterDensity[upperCaseValue] = {
                letter: upperCaseValue,
                count: 1
            };
        }
    });

    const letterDensityAlphabets = Object.values(letterDensity);
    const filteredAlphabets = letterDensityAlphabets.filter((alphabet) => {
        return alphabet != " ";
    })

    console.log("Alphabets", filteredAlphabets);  

    densityList.innerHTML = letterDensityAlphabets.map((alphabet) => {
        const width = (alphabet.count / inputValue.length) * 100;
        // console.log(width.toFixed(2));

        return `
         <div class="density flex-vertical-center">
            <span class="letter">${alphabet.letter}</span>
            <div class="progress-bar"><span style="width: ${width}%;"></span></div> 
            <span class="count ">${alphabet.count} times</span>
        </div>
    `
            ;
    }).join('')


})