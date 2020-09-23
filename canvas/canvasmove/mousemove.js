/*!
 * mouseMove.js
 *
 */

(function mousemove() {

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var emojis = ["❄️"];
    // var emojis = ["♠", "♥", "♦", "♣"];
    var colors = ["#f37b1d", "#8dc63f", "#1cbbb4", "#e03997", "#8799a3"];
    /*canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;*/
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    var particles = [];

    function init() {
        bindEvents();
        loop();
    }

    function bindEvents() {
        document.addEventListener('mousemove', onMouseMove);
    }

    function onMouseMove(e) {
        var x = e.clientX;
        var y = e.clientY;

        // addParticle(x, y, colors[Math.floor(Math.random() * colors.length)],emojis);
        addParticle(x, y, colors[Math.floor(Math.random() * colors.length)],emojis[Math.floor(Math.random() * emojis.length)]);
    }

    function addParticle(x, y, color, emoji) {
        var particle = new Particle(x, y, color, emoji);
        particles.push(particle);
    }

    function updateParticles() {
        if(particles.length === 0) {
            return;
        }

        // Updated particles
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
        }
        // Remove outCanvas particles
        for (var i = particles.length - 1; i >= 0; i--) {
            if (particles[i].position.y > canvas.height || particles[i].alpha <= 0 || particles[i].fontSize <= 0) {
                particles.splice(i, 1);
            }
        }

    }

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateParticles();
        // requestAnimationFrame(loop);
        setTimeout(loop, 1000/60);
    }

    /**
     * Particles
     */

    function Particle(x,y,color,emoji) {

        // this.character = "*";
        this.character = emoji;
        this.velocity = {
            x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
            y: 1
        };
        this.color = color;
        this.position = { x: x, y: y };
        this.fontSize = 24;
        this.alpha = 1;

        this.update = function() {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.fontSize -= 0.1;
            // 设置水平对齐方式
            /* textAlign    设置或返回文本内容的当前对齐方式
             * start :    默认。文本在指定的位置开始。
             * end   :    文本在指定的位置结束。
             * center:    文本的中心被放置在指定的位置。
             * left  :    文本左对齐。
             * right :    文本右对齐。*/
            ctx.textAlign = "center";
            // 设置垂直对齐方式
            /* textBaseline     设置或返回在绘制文本时使用的当前文本基线   
             * alphabetic ：   默认。文本基线是普通的字母基线。
             * top        ：   文本基线是 em 方框的顶端。。
             * hanging    ：   文本基线是悬挂基线。
             * middle     ：   文本基线是 em 方框的正中。
             * ideographic：   文本基线是em基线。
             * bottom     ：   文本基线是 em 方框的底端。 */
            ctx.textBaseline = "middle";
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha - 0.1;
            ctx.font = this.fontSize + 'px Arial, Helvetica, sans-serif';
            if(this.fontSize > 0 && this.alpha > 0) {
                ctx.fillText(this.character, this.position.x, this.position.y);
            }
        }

    }
    init();
})();
