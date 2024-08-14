document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    const biographyContainer = document.getElementById('biography');
    const squares = document.querySelectorAll('.square');
    const canvas = document.getElementById('neuronCanvas');
    const ctx = canvas.getContext('2d');

    // Función para mostrar el contenido principal
    function showMainContent() {
        welcomeScreen.style.display = 'none';
        mainContent.style.display = 'block';
    }

    // Agregar evento click a los botones de bienvenida
    const welcomeButtons = document.querySelectorAll('.welcome-button');
    welcomeButtons.forEach(button => {
        button.addEventListener('click', showMainContent);
    });

    // Biografías de los atletas
    const biographies = {
        khelif: `
            <h2>Imane Khelif</h2>
            <p>Imane Khelif is an Algerian boxer who has excelled in amateur boxing, particularly in the lightweight and welterweight categories. Born in Tiaret, Algeria, she began boxing at an early age, driven by her passion for the sport and her desire to excel in a predominantly male discipline.</p>
            <p>In 2021, Khelif competed in the Tokyo 2020 Olympics, representing Algeria in the lightweight category (57-60 kg). Although she did not win a medal, her participation was historic, as she was the first female Algerian boxer to compete in the Olympics, paving the way for future generations of athletes in her country.</p>
        `,
        duplantis: `
            <h2>Armand Duplantis</h2>
            <p>Armand Duplantis, also known as "Mondo," is a Swedish-American athlete who competes in pole vaulting. Born in Lafayette, Louisiana, into a family with a strong sports background, his father, Greg Duplantis, was a pole vaulter, while his mother, Helena Hedlund, was a heptathlete and volleyball player.</p>
            <p>In 2020, Duplantis broke the world indoor pole vault record with a jump of 6.17 meters, and a week later, he improved it to 6.18 meters. He also set an outdoor world record of 6.15 meters, surpassing the mark set by Sergey Bubka in 1994. At the Tokyo 2020 Olympics, he won the gold medal with a jump of 6.02 meters, cementing his status as one of the greatest athletes in the history of his discipline.</p>
        `,
        horigome: `
            <h2>Yuto Horigome</h2>
            <p>Yuto Horigome is a Japanese professional skateboarder known for his innovative tricks and technical skills. Born in Tokyo, Japan, Horigome began skateboarding at a young age and quickly gained recognition for his unique style and dedication to the sport.</p>
            <p>In 2021, skateboarding made its Olympic debut at the Tokyo 2020 Olympics, and Horigome made history by winning the first-ever gold medal in the men's street skateboarding event. His victory not only marked a milestone for skateboarding as an Olympic sport but also solidified his reputation as one of the top street skaters in the world.</p>
        `,
        delolio: `
            <h2>Matias del Olio</h2>
            <p>Matias del Olio is an Argentine skateboarder who has made a name for himself in the world of professional skateboarding. Known for his smooth style and technical prowess, del Olio has competed in various international competitions and is recognized as one of Argentina's top skaters.</p>
            <p>Del Olio represented Argentina at the Tokyo 2020 Olympics, where skateboarding was included for the first time. Although he did not win a medal, his participation was a significant moment for the sport in Argentina, inspiring a new generation of skaters in his home country.</p>
        `
    };

    // Mostrar biografía al hacer clic en un cuadrado
    squares.forEach(square => {
        square.addEventListener('click', function() {
            const athlete = this.getAttribute('data-athlete');
            biographyContainer.innerHTML = biographies[athlete];
            biographyContainer.classList.add('active');
            window.scrollTo(0, biographyContainer.offsetTop);
        });
    });

    // Efecto visual en el canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let particles = [];
    const particleCount = 100;

    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`,
                dx: Math.random() * 2 - 1,
                dy: Math.random() * 2 - 1
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
    }

    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.dx;
            particle.y += particle.dy;

            if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;
        });
    }

    function animate() {
        drawParticles();
        updateParticles();
        requestAnimationFrame(animate);
    }

    createParticles();
    animate();
});