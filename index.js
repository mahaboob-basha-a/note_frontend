const tokenCheck = localStorage.getItem('x-token')
if(!tokenCheck){
    window.location.href = window.location.href = 'http://127.0.0.1:5500/register/register.html'
}
// side bar
const noteList = document.getElementById('noteList')
const archiveList = document.getElementById('archiveList')
const binList = document.getElementById('binList')
// containers data
const noteContainer = document.getElementById('noteContainer')
const archiveContainer = document.getElementById('archiveContainer')
const archiveCardsContainer = document.getElementById('archiveCardsContainer')
const binContainer = document.getElementById('binContainer')
const binCardsContainer = document.getElementById('binCardsContainer')
// title note add btn
const title = document.getElementById('title')
const note = document.getElementById('note')
const newNoteBtn = document.getElementById('addNote')
// noteCardsContainer
const noteCardsContainer = document.getElementById('noteCardsContainer')
const noteCardsContainerTwo = document.createElement('div')
noteCardsContainerTwo.classList.add('cards-container')
noteCardsContainer.appendChild(noteCardsContainerTwo)
const emptynoteHeading = document.getElementById('emptyNotes')
// note list array
const notelistCheck = ()=>{
    const isExist = localStorage.getItem('noteListarr')
    if(isExist){
        return JSON.parse(isExist)
    }else{
        return []
    }
}
const archivelistCheck = ()=>{
    const isExist = localStorage.getItem('archiveListarr')
    if(isExist){
        return JSON.parse(isExist)
    }else{
        return []
    }
}
const binlistCheck = ()=>{
    const isExist = localStorage.getItem('binListarr')
    if(isExist){
        return JSON.parse(isExist)
    }else{
        return []
    }
}
// note list array
let noteListarr = notelistCheck()
// archive list array
let archiveListarr = archivelistCheck()
// bin list array
let binListarr = binlistCheck()


if(noteListarr.length < 1){
    emptynoteHeading.style.display = 'block'
    emptynoteHeading.style.textAlign = 'center'
    noteCardsContainer.style.display = 'none'
}else{
    emptynoteHeading.style.display='none'
    noteCardsContainer.style.display='block'
    for(let i of noteListarr){
        createNoteCard(i)
    }
}

if(archiveListarr > 0){
    for(let i of archiveListarr){
        createArchiveCard(i)
    }
}
if(binListarr > 0){
    for(let i of archiveListarr){
        createBinCard(i)
    }
}

// bin container data
function createBinCard(id,title,note){
    let notecardDiv = document.createElement('div')
    let notecardH1 = document.createElement('h1')
    let notecardP = document.createElement('p')
    let notecarBtnDiv = document.createElement('div')
    let notecarBtn1 = document.createElement('button')
    let span1 = document.createElement('span')
    let notecarBtn2 = document.createElement('button')
    let span2 = document.createElement('span')
    notecardDiv.classList.add('note-card')
    notecardDiv.id = id
    notecardH1.textContent = title
    notecardDiv.appendChild(notecardH1)
    notecardP.textContent = note
    notecardDiv.appendChild(notecardP)
    notecarBtnDiv.classList.add('note-card-btn')
    span1.classList.add('material-symbols-outlined')
    span1.textContent = 'restore_from_trash'
    span2.classList.add('material-symbols-outlined')
    span2.textContent = 'delete_forever'
    notecarBtn1.appendChild(span1)
    notecarBtn1.addEventListener('click',()=>{
        unDeleteClick(id)
    })
    notecarBtn2.addEventListener('click',()=>{
        deleteBinClick(id)
    })
    notecarBtn2.appendChild(span2)
    notecarBtnDiv.appendChild(notecarBtn1)
    notecarBtnDiv.appendChild(notecarBtn2)
    notecardDiv.appendChild(notecarBtnDiv)
    binCardsContainer.appendChild(notecardDiv)
}

function unDeleteClick(id){
    const deleteNotecard = document.getElementById(id)
    binCardsContainer.removeChild(deleteNotecard)
    const index = binListarr.findIndex(item=>{
        if(item.id === id){
            return true
        }else{
            return false
        }
    })
    const obj = binListarr[index]
    createNoteCard(obj.id,obj.title,obj.note)
    noteListarr.push(obj)
    localStorage.setItem('noteListarr',JSON.stringify(noteListarr))
    binListarr.splice(index,1)
    localStorage.setItem('binListarr',JSON.stringify(binListarr))
}
function deleteBinClick(id){
    const deleteNotecard = document.getElementById(id)
    binCardsContainer.removeChild(deleteNotecard)
    const index = binListarr.findIndex(item=>{
        if(item.id === id){
            return true
        }else{
            return false
        }
    })
    binListarr.splice(index,1)
    localStorage.setItem('binListarr',JSON.stringify(binListarr))
}



// archive container data
function createArchiveCard(id,title,note){
    let notecardDiv = document.createElement('div')
    let notecardH1 = document.createElement('h1')
    let notecardP = document.createElement('p')
    let notecarBtnDiv = document.createElement('div')
    let notecarBtn1 = document.createElement('button')
    let span1 = document.createElement('span')
    let notecarBtn2 = document.createElement('button')
    let span2 = document.createElement('span')
    notecardDiv.classList.add('note-card')
    notecardDiv.id = id
    notecardH1.textContent = title
    notecardDiv.appendChild(notecardH1)
    notecardP.textContent = note
    notecardDiv.appendChild(notecardP)
    notecarBtnDiv.classList.add('note-card-btn')
    span1.classList.add('material-symbols-outlined')
    span1.textContent = 'unarchive'
    span2.classList.add('material-symbols-outlined')
    span2.textContent = 'delete'
    notecarBtn1.appendChild(span1)
    notecarBtn1.addEventListener('click',()=>{
        unArchiveClick(id)
    })
    notecarBtn2.addEventListener('click',()=>{
        deleteArchiveClick(id)
    })
    notecarBtn2.appendChild(span2)
    notecarBtnDiv.appendChild(notecarBtn1)
    notecarBtnDiv.appendChild(notecarBtn2)
    notecardDiv.appendChild(notecarBtnDiv)
    archiveCardsContainer.appendChild(notecardDiv)
}

function deleteArchiveClick(id){
    const deleteNotecard = document.getElementById(id)
    archiveCardsContainer.removeChild(deleteNotecard)
    const index = archiveListarr.findIndex(item=>{
        if(item.id === id){
            return true
        }else{
            return false
        }
    })
    const obj = archiveListarr[index]
    createBinCard(obj.id,obj.title,obj.note)
    binListarr.push(obj)
    localStorage.setItem('binListarr',JSON.stringify(binListarr))
    archiveListarr.splice(index,1)
    localStorage.setItem('archiveListarr',JSON.stringify(archiveListarr))
}

function unArchiveClick(id){
    const deleteNotecard = document.getElementById(id)
    archiveCardsContainer.removeChild(deleteNotecard)
    const index = archiveListarr.findIndex(item=>{
        if(item.id === id){
            return true
        }else{
            return false
        }
    })
    const obj = archiveListarr[index]
    createNoteCard(obj.id,obj.title,obj.note)
    noteListarr.push(obj)
    localStorage.setItem('noteListarr',JSON.stringify(noteListarr))
    archiveListarr.splice(index,1)
    localStorage.setItem('archiveListarr',JSON.stringify(archiveListarr))
}


// note container data 
function createNoteCard(id,title,note){
    let notecardDiv = document.createElement('div')
    let notecardH1 = document.createElement('h1')
    let notecardP = document.createElement('p')
    let notecarBtnDiv = document.createElement('div')
    let notecarBtn1 = document.createElement('button')
    let span1 = document.createElement('span')
    let notecarBtn2 = document.createElement('button')
    let span2 = document.createElement('span')
    notecardDiv.classList.add('note-card')
    notecardDiv.id = id
    notecardH1.textContent = title
    notecardDiv.appendChild(notecardH1)
    notecardP.textContent = note
    notecardDiv.appendChild(notecardP)
    notecarBtnDiv.classList.add('note-card-btn')
    span1.classList.add('material-symbols-outlined')
    span1.textContent = 'archive'
    span2.classList.add('material-symbols-outlined')
    span2.textContent = 'delete'
    notecarBtn1.appendChild(span1)
    notecarBtn1.addEventListener('click',()=>{
        archiveClick(id)
    })
    notecarBtn2.addEventListener('click',()=>{
        deleteNoteClick(id)
    })
    notecarBtn2.appendChild(span2)
    notecarBtnDiv.appendChild(notecarBtn1)
    notecarBtnDiv.appendChild(notecarBtn2)
    notecardDiv.appendChild(notecarBtnDiv)
    noteCardsContainerTwo.appendChild(notecardDiv)
    noteCardsContainer.appendChild(noteCardsContainerTwo)
}
function deleteNoteClick(id){
    const deleteNotecard = document.getElementById(id)
    noteCardsContainerTwo.removeChild(deleteNotecard)
    const index = noteListarr.findIndex(item=>{
        if(item.id === id){
            return true
        }else{
            return false
        }
    })
    const obj = noteListarr[index]
    createBinCard(obj.id,obj.title,obj.note)
    binListarr.push(obj)
    localStorage.setItem('binListarr',JSON.stringify(binListarr))
    noteListarr.splice(index,1)
    localStorage.setItem('noteListarr',JSON.stringify(noteListarr))
}
function archiveClick(id){
    const deleteNotecard = document.getElementById(id)
    noteCardsContainerTwo.removeChild(deleteNotecard)
    const index = noteListarr.findIndex(item=>{
        if(item.id === id){
            return true
        }else{
            return false
        }
    })
    let obj = noteListarr[index]
    createArchiveCard(obj.id,obj.title,obj.note)
    archiveListarr.push(obj)
    localStorage.setItem('archiveListarr',JSON.stringify(archiveListarr))
    noteListarr.splice(index,1)
    localStorage.setItem('noteListarr',JSON.stringify(noteListarr))
}

// add note event
newNoteBtn.addEventListener('click',()=>{
    if(title.value !== '' && note.value !== ''){
        let titleNoteObj = {id:"id" + Math.random().toString(16).slice(2),title:title.value,note:note.value}
        noteListarr.push(titleNoteObj)
        noteCardsContainer.style.display = 'block'
        emptynoteHeading.style.display = 'none'
        createNoteCard(titleNoteObj.id,titleNoteObj.title,titleNoteObj.note)
        title.value = ''
        note.value = ''
    }
})


// side bar active state change
noteList.addEventListener('click',()=>{
    noteList.classList.add('side-active')
    archiveList.classList.remove('side-active')
    binList.classList.remove('side-active')
    noteContainer.style.display = 'block'
    archiveContainer.style.display = 'none'
    binContainer.style.display = 'none'
})
archiveList.addEventListener('click',()=>{
    noteList.classList.remove('side-active')
    archiveList.classList.add('side-active')
    binList.classList.remove('side-active')
    noteContainer.style.display = 'none'
    archiveContainer.style.display = 'block'
    binContainer.style.display = 'none'
})
binList.addEventListener('click',()=>{
    noteList.classList.remove('side-active')
    archiveList.classList.remove('side-active')
    binList.classList.add('side-active')
    noteContainer.style.display = 'none'
    archiveContainer.style.display = 'none'
    binContainer.style.display = 'block'
})

