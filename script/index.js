const loadLessions = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLesson(data.data))
}

const removeActive=()=>{
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn => btn.classList.remove("active"));
}
const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then(data => {
        removeActive();//Remove all class
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add('active')
        displayLevelWord(data.data)
    })
}

const loadWordDetail= async(id)=>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data)
};
// {
//     "word": "Cautious",
//     "meaning": "সতর্ক",
//     "pronunciation": "কশাস",
//     "level": 2,
//     "sentence": "Be cautious while crossing the road.",
//     "points": 2,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "careful",
//         "alert",
//         "watchful"
//     ],
//     "id": 3
// }
const displayWordDetails=(word)=>{ //details-container
   console.log(word)
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
        <div class="">
                <h2 class="text-2xl font-bold">
                    ${word.word} (<i class="fa-solid fa-microphone-high"></i>:${word.meaning})
                </h2>
            </div>
            <div class="">
                <h2 class="font-bold">Meaning</h2>
                <p>${word.meaning}</p>
            </div>
            <div class="">
                <h2 class="font-bold">Example</h2>
                <p>${word.sentence}</p>
            </div>
            <div class="">
                <h2 class="font-bold">Example</h2>
                <span class="btn">${word.synonyms}</span>
            </div>
    `;
    document.getElementById("word_modal").showModal();
}

// {
//     "id": 146,
//     "level": 5,
//     "word": "Quixotic",
//     "meaning": "অসম্ভব ও আবেগপ্রবণ",
//     "pronunciation": "কুইক্সটিক"
// }
const displayLevelWord = (words) => {
    console.log(words)
    //1. get the container and empty
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if(words.length == 0) {
       wordContainer.innerHTML = `
        <div class="text-center bg-sky-100 col-span-full rounded-xl py-10 space-y-6">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-3xl">নেক্সট Lesson এ যান</h2>
        </div>
        `
    }
    // 2. get into every lessons
    words.forEach((word) => {
   let displayWord;

    if (word.word) {
    displayWord = word.word;
    } else {
    displayWord = "শব্দ পাওয়া যায়নি";
    }
    // 3. crate element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5">
            <h2 class="font-bold text-2xl">
            
            ${displayWord}</h2>
            <p class="font-semibold">Meaning / Pronounciation</p>
            <div class="font-bangla font-semibold text-2xl">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি" }"</div>
            
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>`;
        // 4. Append into container
        wordContainer.append(btnDiv);
    });
}
// 
const displayLesson = (lessons) => {
    // 1. get the container and empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    // 2. get into every lessons
    for(let lesson of lessons) {
    //     3. create element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">Lesson - ${lesson.level_no}</button>
        `;
        console.log(lesson);
    //     4. append into container
        levelContainer.append(btnDiv);
    }
};
loadLessions();
