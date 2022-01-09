/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/
toTop.style.visibility="hidden";
/**
 * Define Global Variables
 * 
*/
var activeSection="";
var ulNav=document.getElementById("navbar__list");
var main=document.querySelector("main");
var header=document.querySelector("header");
var newSectionNum=6;



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function isTopVw(element) {
    // get the coordinates of the element box from the viewport
    const top_cordinate = element.getBoundingClientRect().top;
    // return true if the element top is near the top of the viewport, false otherwise
    return (
        top_cordinate >= -10 && top_cordinate <= 0.4 * (window.innerHeight || document.documentElement.clientHeight)
    );
}



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){
    ulNav.innerHTML="";
    const sections=document.querySelectorAll("main>section");
    for(let section of sections){
        const list=document.createElement("li");
        //for link
        const link=document.createElement("a");
        link.className="menu__link";
        link.setAttribute("href","#"+section.id);
        link.textContent=section.getAttribute("data-nav");
        link.addEventListener("click",scrollToAnchor);
        ////
        list.appendChild(link);
        ulNav.appendChild(list);

        //more or less
        const icon=section.querySelector("h2>i");
        icon.classList.add("more");
        icon.addEventListener("click", moreOrLess, true);
    }
}

buildNav();

// Add class 'active' to section when near top of viewport
function beActive(){
    //active class
    const sections=document.querySelectorAll("main>section");
    for(let section of sections){
        if(isTopVw(section)){
            section.classList.add("active");
        }else{
            section.classList.remove("active");
        }
    }
}

// Scroll to anchor ID using scrollBy event
function scrollToAnchor(e){
    e.preventDefault();
    const y=document.querySelector(e.target.getAttribute("href")).getBoundingClientRect()["y"];
    window.scrollBy({
        top: y,
        left: 0, 
        behavior:"smooth"
    })
}



/**
 * End Main Functions
 * Events
*/


document.addEventListener("scroll",(e)=>{
    //hide navigation
    header.style.visibility="hidden";
    setTimeout(()=>{
        header.style.visibility="visible";
    },500);

    //toTop button 
    const toTop=document.getElementById("toTop");
    if(document.body.scrollTop>100) toTop.style.visibility="visible";
    else toTop.style.visibility="hidden";
    
    //Make Active
    beActive();    
});



//Go back link (return to top)
document.querySelector("#toTop").addEventListener("click",(e)=>{
    e.preventDefault();
    document.body.scrollTo({
        top:0,
        left:0,
        behavior:"smooth"
    });
})

//More or Less Content
function moreOrLess(e){
    const landing_container=e.target.parentElement.parentElement;
    if(e.target.className.search("more")>=0){
        e.target.className="far fa-plus-square less";
        landing_container.classList.remove("landing_more");
        landing_container.classList.add("landing_less");
        landing_container.parentElement.style.minHeight="190px";
        
    }else{
        e.target.className="far fa-minus-square more";
        landing_container.classList.remove("landing_less");
        landing_container.classList.add("landing_more");
        landing_container.parentElement.style.minHeight="60vh";
    }
}

// Build menu 

// Scroll to section on link click


// New Section
function newSection(e){
    e.preventDefault();
    let section=document.createElement("section");
    section.id=`section${newSectionNum}`;

    section.setAttribute("data-nav",`Section ${newSectionNum}`);
    let div=document.createElement("div");
    div.className="landing__container";

    const heading=document.createElement("h2");
    heading.textContent=document.querySelector("form>#heading").value+" ";
    heading.innerHTML+=`<i class="far fa-minus-square"></i>`;

    const p1=document.createElement("p");
    p1.textContent=document.querySelector("form>#body").value;
    const p2=document.createElement("p");
    p2.textContent=document.querySelector("form>#about").value;

    div.appendChild(heading);
    div.appendChild(p1);
    div.appendChild(p2);
    section.appendChild(div);
    main.appendChild(section);


    //Update the content

    document.querySelector("form>#heading").value="";
    document.querySelector("form>#body").value="";
    document.querySelector("form>#about").value="";
    
    buildNav();
    newSectionNum++;
}

const sendButton=document.querySelector("form>button");
sendButton.addEventListener("click",newSection);

