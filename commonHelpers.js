import{S as u,i as d}from"./assets/vendor-8c59ed88.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();async function h(i,r){const s=await fetch(`${i}?${r}`);if(!s.ok)throw new Error(s.statusText);return await s.json()}function p(i){return i.hits.map(({webformatURL:r,largeImageURL:s,tags:o,likes:e,views:t,comments:a,downloads:l})=>`
        <li class="search-item">
            <a class="search-link" href="${s}">
                <img src="${r}" alt="${o}">
            </a>
            <div class="search-item-text-wrap">
                <div class="search-item-text">
                    <h2>Likes</h2>
                    <p>${e}</p>
                </div>
                <div class="search-item-text">
                    <h2>Views</h2>
                    <p>${t}</p>
                </div>
                <div class="search-item-text">
                    <h2>Comments</h2>
                    <p>${a}</p>
                </div>
                <div class="search-item-text">
                    <h2>Downloads</h2>
                    <p>${l}</p>
                </div>
            </div>
        </li>
    `).join("")}const f="44071126-68094a25e5e927b0ae90eca12",m="https://pixabay.com/api/",y=document.querySelector(".search-form"),c=document.querySelector(".gallery"),n=document.querySelector(".loader"),g=new u(".gallery a",{captionsData:"alt",captionDelay:250});y.addEventListener("submit",v);function v(i){i.preventDefault();const r=i.target.query.value;if(r==="")return;c.innerHTML="";const s=new URLSearchParams({key:f,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0});n.style.display="block",h(m,s).then(o=>{if(o.hits.length===0){d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"red",messageColor:"white"}),n.style.display="none";return}c.insertAdjacentHTML("beforeend",p(o)),g.refresh(),n.style.display="none"}).catch(o=>{console.log(o),n.style.display="none"})}
//# sourceMappingURL=commonHelpers.js.map
