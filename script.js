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
                
                
                <a href= "${trailerLink}" target="_blank" class="trailerBtn">Watch Trailer</a>";

                
            `;
            modal.style.display = "flex";
        });
    });

    closeBtn.onclick = () => modal.style.display = "none";

    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = "none";

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


};