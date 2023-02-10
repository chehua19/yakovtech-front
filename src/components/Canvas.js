import React, {useRef, useEffect} from 'react'



const Canvas = props => {
    const canvasRef = useRef(null);

    let data = [
        { color: "#F22CDF", angle: 5},
        { color: "#9FE018", angle: 5},
        { color: "#7D2BED", angle: 5},
        //{ color: "#000", angle: 345}
      ];
    
    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        let startAngle = 0;

        data.forEach((d) => {
            startAngle += 5;

            let angle = (startAngle+frameCount)%360;
            let cx = ctx.canvas.width/2;
            let cy = ctx.canvas.height/2;
            ctx.strokeStyle = d.color;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            //ctx.arc(cx, cy, 100, toRadians(angle), toRadians(angle+d.angle));
            console.log(angle);
            
            let line1 = getCoordinates(ctx, angle);
            ctx.lineTo(line1[0], line1[1]);
            ctx.lineWidth = 1;
            let line2 = getCoordinates(ctx, angle+10);
            ctx.lineTo(line2[0], line2[1]);

            ctx.lineTo(cx, cy);
            ctx.stroke();
            

        });
    }
    
    const toRadians = degree => {
        return degree*Math.PI/180;
    }

    const getCoordinates = (ctx, degree) => {
        let width = ctx.canvas.width;
        let height = ctx.canvas.height;
        let x, y;
        if (degree > 315 || degree < 45){
            x = width;
            y = (height/2) + (height/2) * Math.tan(toRadians(degree)) ;
        } 
        else if(degree > 45 && degree < 135) {
            y = height;
            x = (width/2) + (width/2) / Math.tan(toRadians(degree));
        } else if(degree > 135 && degree < 225) {
            x = 0;
            y = (height/2) - (height/2) * Math.tan(toRadians(degree));
        } else if(degree > 225 && degree < 315) {
            y = 0;
            x = (width/2) - (width/2) / Math.tan(toRadians(degree));
        } 
        
        return [x, y];
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