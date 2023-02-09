import React, {useRef, useEffect} from 'react'



const Canvas = props => {
    const canvasRef = useRef(null);

    let data = [
        { color: "#F22CDF"},
        { color: "#9FE018"},
        { color: "#7D2BED"}
      ];
    
    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        let startAngle = 0;
        data.forEach((d) => {
            startAngle += 5;
            let cx = ctx.canvas.width/2;
            let cy = ctx.canvas.height/2;
            ctx.fillStyle = d.color;
            ctx.beginPath();

            ctx.arc(cx, cy, 100, toRadians(startAngle+frameCount), toRadians(startAngle+frameCount+5));
            ctx.lineTo(cx, cy);
            ctx.fill();
            ctx.closePath();
        });
    }
    
    const toRadians = degree => {
        return degree*Math.PI/180;
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

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        }
    }, [draw])

    return <canvas width={"100%"} height={"100%"} ref={canvasRef} {...props}/>
} 


export default Canvas