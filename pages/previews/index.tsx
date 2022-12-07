import { useEffect } from "react"

const MagicZoom = () => {

    useEffect(() => {
        var holder: any = document.querySelector('.image-holder');
        var image: any = document.getElementById('image');
        var previewHolder = document.querySelector('.image-preview');
        var imagePreview: any = document.getElementById('image-preview');
        imagePreview.src = image.src;
        holder.addEventListener('mousemove', (event: any) => {
            var magGlass: any = document.querySelector('.magnifiying-glass');
            let left = event.clientX - holder.offsetLeft;
            let top = event.clientY - holder.offsetTop;
            let height = image.clientHeight;
            let width = image.clientWidth;
            let previewWidth = imagePreview.clientWidth;
            let scaleValue = 2500 / previewWidth;
            imagePreview.style.transform = 'scale(' + scaleValue + ')';
            let magTop = top - 50;
            let magLeft = left - 50;
            if (magTop <= 0) {
                magTop = 0;
            }
            if (magLeft <= 0) {
                magLeft = 0;
            }
            if (magLeft >= (width - 100)) {
                magLeft = width - 100;
            }
            if (magTop >= (height - 100)) {
                magTop = height - 100;
            }
            magGlass.style.top = magTop + 'px';
            magGlass.style.left = magLeft + 'px';
            let topPercentage = top / height * 100;
            let leftPercentage = left / width * 100;
            imagePreview.style.top = - (5 * magTop) + "px";
            imagePreview.style.left = - (5 * magLeft) + "px";
        });
        // holder.addEventListener('mouseenter', () => {
        //     previewHolder.classList.remove('d-none');
        //     let magGlass = document.createElement("DIV");
        //     magGlass.className = 'magnifiying-glass';
        //     holder.appendChild(magGlass);
        // });
        holder.addEventListener('mouseleave', () => {
            var magGlass = holder.querySelector('.magnifiying-glass');
            previewHolder.classList.add('d-none');
            if (magGlass && magGlass.parentNode) {
                magGlass.parentNode.removeChild(magGlass);
                imagePreview.style.top = 0;
                imagePreview.style.left = 0;
            }
        });
    }, [])

    const onMouseEnterHandler = (e: any) => {
        document.querySelector('.image-preview').classList.remove('d-none');
        let magGlass = document.createElement("DIV");
        magGlass.className = 'magnifiying-glass';
        document.querySelector('.image-holder').appendChild(magGlass);
    }

    return <div>
        <figure className="image-holder" onMouseEnter={onMouseEnterHandler}>
            <img src="https://www.hdwallpapers.in/download/st_pauls_cathedral_millennium_bridge_london_4k_8k-HD.jpg" id="image" />
        </figure>
        <figure className="image-preview d-none">
            <img src="https://www.hdwallpapers.in/download/st_pauls_cathedral_millennium_bridge_london_4k_8k-HD.jpg" id="image-preview" />
        </figure>
    </div>
}

export default MagicZoom