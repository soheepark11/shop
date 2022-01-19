//json파일을 받아오는 함수
function loadItems(){
    //json데이터를 fetch를 통해 받아옴
    return fetch('data/data.json')
    //성공적으로 데이터를 받으면 제이슨으로 변환하여 리턴
    .then(response => response.json())
    //변환이 성공하면 json매개변수에 받아서 json의 key items값을 리턴
    .then(json => json.items);
}
//받아온 json데이터를 html요소로 변환하여 화면에 나타내기!
function displayItems(items){
    const container = document.querySelector('.items');
    container.innerHTML = items.map(abc => createHTMLString(abc)).join('');
}
//html스트링으로 변경
function createHTMLString(item){
    return `
        <li class="item">
          <img src=${item.image} alt=${item.type} class="item_thumbnail">
          <span>${item.gender} ${item.size}</span>
        </li>
    `;
}

//이벤트 함수
function setEventListerners(items){
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttonDiv');
    logo.addEventListener('click', () => displayItems(items));
    // logo.addEventListener('click', function(){
    //     displayItems(items);
    // });
    buttons.addEventListener('click', event => onButtonClick(event, items));
    // buttons.addEventListener('click', function(event){
    //     onButtonClick(event, items);
    // });
    
}
function onButtonClick(event, items){
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    //키나벨류 하나라도 없으면 리턴
    if(key == null || value == null){
        return;
    }
    const filterd = items.filter(item => item[key] === value);
    console.log("aaaa");
    console.log(filterd);
    displayItems(filterd);
}
loadItems()
.then(items =>{
    displayItems(items);
    setEventListerners(items);
})