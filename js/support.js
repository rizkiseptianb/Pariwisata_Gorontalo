document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Scroll Reveal Animation
    const reveals = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;
        
        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            }
        });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger on load

    // 2. FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all others
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.style.maxHeight = null;
            });
            
            // If it wasn't active, open it
            if (!isActive) {
                this.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // 3. Counter Animation (Live Stats)
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;
    
    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps
            
            let currentCount = 0;
            const updateCounter = () => {
                currentCount += increment;
                if (currentCount < target) {
                    counter.innerText = Math.ceil(currentCount);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    };

    // Intersection Observer for Counters
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                startCounters();
                hasCounted = true;
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    // 5. Contact Form Validation
    const form = document.getElementById('support-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const successMsg = document.getElementById('form-success');
            
            // Reset errors
            document.querySelectorAll('.input-group').forEach(group => group.classList.remove('error'));
            successMsg.style.display = 'none';
            
            if (name.value.trim() === '') {
                name.parentElement.classList.add('error');
                isValid = false;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                email.parentElement.classList.add('error');
                isValid = false;
            }
            
            if (subject.value === '') {
                subject.parentElement.classList.add('error');
                isValid = false;
            }
            
            if (message.value.trim() === '') {
                message.parentElement.classList.add('error');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerText;
                btn.innerText = 'Sending...';
                
                setTimeout(() => {
                    form.reset();
                    btn.innerText = originalText;
                    successMsg.style.display = 'block';
                    setTimeout(() => successMsg.style.display = 'none', 5000);
                }, 1500);
            }
        });
    }

    // 6. AI Chatbot Simulation
    const chatbot = document.getElementById('chatbot');
    const openChatBtns = document.querySelectorAll('.open-chat-btn');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatBody = document.getElementById('chat-body');
    
    // Auto replies dictionary (Multilingual Support)
    const autoReplies = {
        'beach': 'The nearest and most popular beach is Pantai Otanaha, about 30 mins away. Should I give you directions?',
        'taxi': 'I can help with that. Are you going to Djalaluddin Airport? The standard fare is around IDR 150,000.',
        'seafood': 'Gorontalo is famous for seafood! I recommend trying "Ilahe" or grilled fish at RM Tenda Biru near the coast.',
        'rain': 'Currently, it is partly cloudy in Gorontalo. There is a 20% chance of light rain later this evening.',
        'indonesia': 'Halo! Ada yang bisa saya bantu selama Anda berada di Gorontalo?',
        'hospital': 'The nearest main hospital is RSUD Prof. Dr. H. Aloei Saboe. Do you need an ambulance? Call 118 immediately.',
        'default': "I'm sorry, I'm a virtual assistant. For complex issues, please use our contact form or call our 24/7 help center."
    };

    openChatBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            chatbot.classList.add('active');
        });
    });

    closeChat.addEventListener('click', () => {
        chatbot.classList.remove('active');
    });

    const addMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-msg', sender);
        msgDiv.innerText = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const handleSend = () => {
        const text = chatInput.value.trim().toLowerCase();
        if (text === '') return;
        
        // Add User Message
        addMessage(chatInput.value, 'user');
        chatInput.value = '';
        
        // Bot Typing Simulation
        setTimeout(() => {
            let replyText = autoReplies['default'];
            
            for (let key in autoReplies) {
                if (text.includes(key)) {
                    replyText = autoReplies[key];
                    break;
                }
            }
            addMessage(replyText, 'bot');
        }, 1000);
    };

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    // Handle suggested chips clicks
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            chatInput.value = chip.innerText;
            handleSend();
        });
    });
});
