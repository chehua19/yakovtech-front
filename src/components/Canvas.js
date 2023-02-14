import React, {useRef, useEffect} from 'react';

const Canvas = props => {
    const canvasRef = useRef(null);

    const data = [
        { color: "#F22CDF"},
        { color: "#9FE018"},
        { color: "#7D2BED"},
        //{ color: "#000", angle: 345}
      ];
    const delta = 100;
    const toRadians = degree => {
        return degree*Math.PI/180;
    }

    const toDegree = radian => {
        return radian/(Math.PI/180);
    }
    
    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        let startAngle = 0;
        let oldLines = null;
        
        data.forEach((d) => {
            let angle = startAngle === 0 ? (startAngle+frameCount)%360 : startAngle;
            let cx = ctx.canvas.width/2;
            let cy = ctx.canvas.height/2;
            ctx.strokeStyle = d.color;
            ctx.fillStyle = d.color;
            
            //ctx.arc(cx, cy, 100, toRadians(angle), toRadians(angle+d.angle));

            ctx.beginPath();
            ctx.moveTo(cx, cy);
            
            let coordinatesData = getCoordinates(ctx, angle);
            let lines = coordinatesData.dotArr;
            startAngle = coordinatesData.newAngle;
            
            if (oldLines == null) {
                oldLines = lines[0];
            }

            ctx.lineTo(oldLines[0], oldLines[1]);
            ctx.lineTo(lines[1][0], lines[1][1]);
            
            oldLines = lines[1];
            
            ctx.fill();
        });
       
    }

    const getCoordinates = (ctx, degree) => {
        let width = ctx.canvas.width;
        let height = ctx.canvas.height;
        let x1, x2, y1, y2, newAngle;

        if (degree > 315 || degree <= 45){
            x1 = width;
            y1 = (height/2) + (height/2) * Math.tan(toRadians(degree));
            x2 = x1;
            y2 = y1 + delta;
            newAngle = toDegree(Math.atan2(height/2 ,y2));
        } 
        else if(degree > 45 && degree <= 135) {
            x1 = (width/2) + (width/2) / Math.tan(toRadians(degree));
            y1 = height;
            x2 = x1 - delta;
            y2 = y1;
            newAngle = toDegree(Math.atan2((height/2) / (x2 + (height/2))));
        } 
        else if(degree > 135 && degree <= 225) {
            x1 = 0;
            y1 = (height/2) - (height/2) * Math.tan(toRadians(degree));
            x2 = x1;
            y2 = y1 - delta;
            newAngle = toDegree(Math.atan2((height/2) / (y2 + (height/2))));
        } 
        else if(degree > 225 && degree <= 315) {
            x1 = (width/2) - (width/2) / Math.tan(toRadians(degree));
            y1 = 0;
            x2 = x1 + delta;
            y2 = y1;
            newAngle = toDegree(Math.atan2((width/2) / (x2 + (width/2))));
        }      
        
        return {
            dotArr: [[x1, y1], [x2, y2]],
            newAngle:  newAngle
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