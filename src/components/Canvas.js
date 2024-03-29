import React, {useRef, useEffect} from 'react';

const Canvas = props => {
    const canvasRef = useRef(null);

    const data = [
        { color: "#F22CDF"},
        { color: "#9FE018"},
        { color: "#7D2BED"}
      ];
    const delta = 100;
    
    const draw = (ctx, frameCount) => {
        let offsetProgress = 0;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "#000";
        ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fill();

        data.forEach((d) => {
            let progress = offsetProgress === 0 ? (frameCount*0.35)%100 : offsetProgress;
            ctx.strokeStyle = d.color;
            ctx.fillStyle = d.color;

            ctx.beginPath();
            let data = getCoordinates(ctx, progress);
            ctx.rect(data.x, data.y, delta, delta);
            ctx.fill();
            offsetProgress = data.offset;
        });
       
    }

    const getCoordinates = (ctx, progress) => {
        let width = ctx.canvas.width;
        let height = ctx.canvas.height;
        let x, y, offset;

        if (progress <= 25){
            x = (progress/25) * width;
            y = 0;
            offset = ((x-100) / width*25);
        } 
        else if( progress <= 50) {
            x = width;
            y = ((progress-25)/25) * height;
            offset = (((y-100) / height*25) + 25) % 100;
        } 
        else if(progress <= 75) {
            x = width - (((progress-50)/25) * width);
            y = height;           
            offset = (((width - x - 100) / width*25) + 50) % 100;
        } 
        else if(progress <= 100) { 
            x = 0;
            y = height - (((progress-75)/25) * height);
            offset = (((height - y - 100) / height*25) + 75) % 100;
        }      
        
        return {
            x: x - delta/2,
            y: y - delta/2,
            offset: offset
        };        
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let frameCount = 0
        let animationFrameId
        
        const render = () => {
            frameCount++;
            draw(context, frameCount);
            animationFrameId = window.requestAnimationFrame(render);
        }
        render();

        const handleResize = e => {
            context.canvas.height = window.innerHeight;
            context.canvas.width = window.innerWidth;
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
        }
    }, [draw])

    return <canvas ref={canvasRef} {...props}/>
} 


export default Canvas