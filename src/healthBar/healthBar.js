import './healthBar.scss'

const defaults = {
    points: 1000,
    currentPoints: 1000,
    pointsPerSecond: 5,
    pointsSeparator: '/',
};

export default class HealthBar {
    constructor(el, opts){
        this.el = typeof el === 'string' ? document.querySelector(el) : el;
        this.opts = Object.assign({}, defaults, opts);

        this.points = this.opts.points;
        this.pointsPerSecond = this.opts.pointsPerSecond;
        this.currentPoints = this.opts.currentPoints;

        this.init();
    }

    init(){
        this.createContainer();
        this.render();
        this.defineDOM();
    }

    createContainer(){
        const el = document.createElement('div');
        el.className = 'health-bar';

        this.$hb = el;
        this.el.appendChild(el);
    }

    defineDOM(){
        this.$currnetPoints = this.el.querySelector('.health-bar--points-current');
        this.$pointsPerSecond = this.el.querySelector('.health-bar--regen');
    }

    /**
     * Decreases current points by passed value
     * @param {number} value - how many points should by wasted
     */
    waste(value){
        let val = this.currentPoints - value;
        if (val < 0) val = 0;
        this.currentPoints = Math.round(val);
        this.updateCurrentPoints();
    }

    /**
     * Recovers current points by passed value
     * @param {Number} value - how many points should be recovered
     */
    recover(value) {
        let val = this.currentPoints + value;
        if (val > this.points) val = this.points;
        this.currentPoints = Math.round(val);
        this.updateCurrentPoints();
    }

    updateCurrentPoints(){
        this.$currnetPoints.innerHTML = this.currentPoints;
    }

    get html(){
        return `
            <div class="health-bar--points">
                <span class="health-bar--points-current">${this.currentPoints}</span>
                <span class="health-bar--points-separator">${this.opts.pointsSeparator}</span>                  
                <span class="health-bar--points-max">${this.points}</span>
            </div>    
            <div class="health-bar--regen">+${this.pointsPerSecond}</div>
        `
    }

    render(){
        this.$hb.innerHTML = this.html;
    }
}
