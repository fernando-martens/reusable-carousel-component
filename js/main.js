const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
const SELECTOR_INDICATORS = '.carousel-indicators';
const ORDER_NEXT = 'next';
const ORDER_PREV = 'prev';
const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';
const CLASS_NAME_END = 'carousel-item-end';
const CLASS_NAME_START = 'carousel-item-start';
const CAROUSEL_CONTROL_PREV = '.carousel-control.prev'
const CAROUSEL_CONTROL_NEXT = '.carousel-control.next'
const SELECTOR_ITEM = '.carousel-item'
const SELECTOR_CAROUSEL_BULLETS = '.carousel-bullet'
const SELECTOR_ACTIVE_ITEM = '.active.carousel-item'
const CLASS_NAME_ACTIVE$2 = 'active';

const SelectorEngine = {
    find(selector, element = document.documentElement) {
        return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
    },

    findOne(selector, element = document.documentElement) {
        return Element.prototype.querySelector.call(element, selector);
    },
};

class Carousel {
    constructor(elemt) {
        this._element = elemt
        this._items = SelectorEngine.find(SELECTOR_ITEM, this._element);
        this._bullets = SelectorEngine.find(SELECTOR_CAROUSEL_BULLETS, this._element);
        this._activeBullet = this._bullets[0]
        this._activeElement = this._items[0]
        this._activeElementIndex = this._getItemIndex(this._activeElement);
        this._carouselControlPrev = SelectorEngine.findOne(CAROUSEL_CONTROL_PREV, this._element);
        this._carouselControlNext = SelectorEngine.findOne(CAROUSEL_CONTROL_NEXT, this._element);
        this._addEventListeners()
        this._renderItems()
    }

    static createInstance(element) {
        return new this(element);
    }

    static carouselInterface(element) {
        Carousel.createInstance(element);
    }

    toIndex(e) {
        let index = this._getItemIndex(e.target, SELECTOR_CAROUSEL_BULLETS)
        this._nextElement = this._items[index]
        this._renderItems(true)
    }

    next() {
        this._nextElement = this._getNextElement(ORDER_NEXT)
        this._renderItems(true)
    }
    prev() {
        this._nextElement = this._getNextElement(ORDER_PREV)
        this._renderItems(true)
    }

    _renderItems(state = null) {
        this._items.forEach(item => {
            item.style.display = 'none'
        });
        this._bullets.forEach(bullet => {
            bullet.classList.remove('active')
        })
        if (state) {
            this._activeElementIndex = this._getItemIndex(this._nextElement);
            this._activeBullet = this._bullets[this._activeElementIndex];
            this._activeElement = this._nextElement;
            this._nextElement = undefined;
        }
        this._activeElement.style.display = 'block'
        this._activeBullet.classList.add("active")
    }

    _addEventListeners() {
        this._carouselControlPrev.addEventListener("click", () => {
            this.prev(true)
        });
        this._carouselControlNext.addEventListener("click", () => {
            this.next()
        });

        this._bullets.forEach(bullet => {
            bullet.addEventListener('click', (e) => {
                this.toIndex(e)
            })
        })
    }

    _getItemIndex(element, selector = SELECTOR_ITEM) {

        if (selector == SELECTOR_ITEM) {
            this._items = SelectorEngine.find(selector, this._element);
            return this._items.indexOf(element);
        } else {
            var i = SelectorEngine.find(selector, this._element);
            return this._bullets.indexOf(element);
        }
    }

    _getNextElement(order) {
        const index = this._activeElementIndex
        const listLength = this._items.length;
        if (order == ORDER_NEXT) {
            let nextIndex = index + 1
            if (index == listLength - 1) return this._items[0]
            else return this._items[nextIndex]
        } else if (order == ORDER_PREV) {
            let previusIndex = index - 1
            if (index == 0) return this._items[listLength - 1]
            else return this._items[previusIndex]
        }
        return;
    }
}


window.onload = function() {
    const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
    for (let i = 0, len = carousels.length; i < len; i++) {
        Carousel.carouselInterface(carousels[i]);
    }
};