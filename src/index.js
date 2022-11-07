import {renderTrending} from './js/render-trending'; 
import {renderTrendingWithScroll} from './js/render-trending-mobile-scroll';

if(screen.width <= 768) {
    renderTrendingWithScroll();
}
else {
    renderTrending();
}