window.onload = function() { 
    
    const searchInput = document.getElementById('movieSearch'); 
    const statusDisplay= document.getElementById('searchStatus'); 
    
    searchInput.oninput = function() { 
        if(searchInput.value.length > 0) { 
            statusDisplay.innerText = "Searching for: " + searchInput.value; 
            statusDisplay.style.color ="#f5c518"; 
        } else { 
            statusDisplay.innerText = "Awaiting input..."; 
            statusDisplay.style.color = "#ffffff"; 
        } 
    }; 
    
    const modal = document.getElementById("movieModal"); 
    const closeBtn = document.querySelector(".closeModal"); 
    
    document.querySelectorAll('.movieCard').forEach(card => { 
        card.addEventListener('click', () => { 
            const title = card.querySelector('h3').innerText; 
            const rating = card.querySelector('p').innerText; 
            const trailerLink = `https://www.youtube.com/results?search_query=${title}+trailer`; 
            
            document.getElementById('modalDetails').innerHTML = ` 
                <h1 style="color: #DBA506">${title}</h1> 
                <p class="imdbRating">${rating}</p> 
                <p>Prepare to enjoy one of the best trending movies of today ${title} </p> 
                <div style="display: flex; gap; 10px; justify-content: center;"> 
                    <a href= "${trailerLink}" target="_blank" class="trailerBtn">Watch Trailer</a> 
                    <button id="modalWatchListBtn" class="trailerBtn" style="background-color: #DBA506; border: 1px solid #DBA506;"> 
                        + Watchlist 
                    </button> 
                </div> 
            `; 

            const watchlistBtn = document.getElementById('modalWatchListBtn'); 
            watchlistBtn.addEventListener('click', () => { 
                addToWatchlist(title, watchlistBtn); 
            }); 



            modal.style.display = "flex"; 
        }); 
    }); 

 


    document.querySelectorAll('.celebCard').forEach(celeb => { 
        celeb.addEventListener('click', () => { 
            const name = celeb.querySelector('.celebName').innerText; 
            const rank = celeb.querySelector('.celebRank').innerText; 

            document.getElementById('modalDetails').innerHTML = ` 
                <h1 style="color: #DBA506">${name}</h1> 
                <p style="color: #999;">IMDb Star Rank: ${rank}</p> 
                <p> This celebrity is currently trending in the top rankings this month!</p> 
            `; 
            modal.style.display = "flex"; 
        }); 
    }); 

 

    closeBtn.onclick = () => modal.style.display = "none"; 


    window.onclick = (event) => { 
        if (event.target == modal) modal.style.display = "none"; 

 
    renderWatchlist(); 
    }; 

 

 
    const canvas = this.document.getElementById('cinamatic-canvas'); 
    const ctx = canvas.getContext('2d') 
    let particlesArray = []; 

    function resize() { 
        canvas.width= window.innerWidth; 
        canvas.height = window.innerHeight * 0.7;  
    } 


    window.onresize = resize; 
    resize(); 

 
    function init() { 
        for (let i = 0; i < 50; i++) { 
            let particle = { 
                x: Math.random() * canvas.width, 
                y: Math.random() * canvas.height, 
                moveX: (Math.random() - 0.5) * 2, 
                moveY: (Math.random() - 0.5) * 2, 
                size: 2 
            }; 
            particlesArray.push(particle) 
        } 
    } 

 
    function handleParticles() { 
        for (let i = 0; i < particlesArray.length; i++) { 
            let p = particlesArray[i]; 
           
            p.x += p.moveX; 
            p.y += p.moveY 

            if (p.x > canvas.width || p.x < 0){ 
                p.moveX = p.moveX * -1; 
            } 

            if (p.y > canvas.height || p.y < 0){ 
                p.moveY = p.moveY * -1; 
            } 

            ctx.fillStyle ='#DBA506'; 
            ctx.beginPath(); 
            ctx.arc(p.x, p.y, p.size, 0, Math.PI *2); 
            ctx.fill(); 
        }
    } 

 
    function animate() { 
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        handleParticles(); 
        requestAnimationFrame(animate); 
    } 


    init(); 
    animate(); 
    renderWatchlist(); 

}; 

function addToWatchlist(movieTitle, btn) { 
    let watchlist = JSON.parse(localStorage.getItem('myWatchlist')) || []; 

    if(!watchlist.includes(movieTitle)) { 
        watchlist.push(movieTitle); 
        localStorage.setItem('myWatchlist', JSON.stringify(watchlist)); 

        btn.innerText = "Added"; 
        btn.style.backgroundColor = "#4caf50" 
        btn.classList.add("addedSuccess"); 
        btn.style.color = "white"; 

        renderWatchlist(); 
    } else { 
        alert(`${movieTitle} is aleady in your watchlist.` ); 

    } 
} 

 
function removeFromWatchlist(movieTitle) { 
    let watchlist = JSON.parse(localStorage.getItem('myWatchlist'))  || []; 

    watchlist = watchlist.filter(title => title !== movieTitle); 

    localStorage.setItem('myWatchlist', JSON.stringify(watchlist)); 

    renderWatchlist(); 

} 

        
function renderWatchlist() { 
    const listElement = document.getElementById('watchlistItems'); 
    if (!listElement) return; 

    let watchlist = JSON.parse(localStorage.getItem('myWatchlist')) || []; 
    listElement.innerHTML =''; 

    if (watchlist.length === 0) { 
        listElement.innerHTML = '<p style=color: #999; padding: 20px;">Your watch list is empty.</p>'; 
        return; 
    } 

    watchlist.forEach(movieTitle => { 
        const item = document.createElement('div'); 
        item.className = 'watchlist-item'; 

        item.innerHTML = ` 
        <h3>${movieTitle}</h3>  
        <button onclick="removeFromWatchlist('${movieTitle}')" class="remove-btn">Remove</button> 
    `; 
    listElement.appendChild(item); 
    }); 
} 

 