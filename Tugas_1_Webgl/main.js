function main(){
    /**
    * @type {HTMLCanvasElement} canvas
    */
   const canvas = document.getElementById('myCanvas');
 
   /**
    * @type {WebGLRenderingContext} gl
    */
   const gl = canvas.getContext('webgl');
 
 
     //mendefinisikan posisi titik2 tersebut
     /**
      * A (0, 0.5); B(-0.5, -0.5); C(0.5, -0.5)
      */
     var vertices = [
        //  0.2, 0.2, 1.0, 0.0, 0.0,  //titik A
        //  -0.2, 0.2, 0.0, 1.0, 0.0,  //titik B
        //  -0.2, -0.2, 0.0, 0.0, 1.0,  //titik C
        //  0.2, -0.2, 1.0, 0.0, 1.0  //titik D
         -0.5, 0.88,    1.0, 0.0, 0.0,
         -0.54,0.875,   1.0, 0.0, 0.0,
         -0.46,0.875,   1.0, 0.0, 0.0,
         -0.63, 0.82,   1.0, 0.0, 0.0,
         -0.37, 0.82,   1.0, 0.0, 0.0,
         -0.68,0.7,     1.0, 0.0, 0.0,
         -0.32,0.7,     1.0, 0.0, 0.0,
         -0.69,0.6,     1.0, 0.0, 0.0,
         -0.31,0.6,     1.0, 0.0, 0.0,
         -0.68,0.55,    1.0, 0.0, 0.0,
         -0.32,0.55,    1.0, 0.0, 0.0,
         -0.64, 0.51,   1.0, 0.0, 0.0,
         -0.36, 0.51,   1.0, 0.0, 0.0,
         -0.54,0.46,    1.0, 0.0, 0.0,
         -0.46,0.46,    1.0, 0.0, 0.0,
         -0.535,-0.26,  1.0, 0.0, 0.0,
         -0.465,-0.26,  1.0, 0.0, 0.0,
         -0.53,-0.28,   1.0, 0.0, 0.0,
         -0.47,-0.28,   1.0, 0.0, 0.0,
         -0.517,-0.285, 1.0, 0.0, 0.0,
         -0.483,-0.285, 1.0, 0.0, 0.0,
     ];
 
     var vertexBuffer = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
     gl.bindBuffer(gl.ARRAY_BUFFER, null);
 
     var vertexShaderCode = `
     attribute vec2 a_Position;
     attribute vec3 a_Color;
     varying vec3 v_Color;
     uniform float dx;
     uniform float dy;
     uniform float dz;
     void main(){
         v_Color = a_Color;
         mat4 translasi = mat4(
             1.0, 0.0, 0.0, 0.0,
             0.0, 1.0, 0.0, 0.0,
             0.0, 0.0, 1.0, 0.0,
             dx, dy, dz, 1.0
         );
         gl_Position = translasi * vec4(a_Position, 0.0, 1.0);
     }`;
 
     //var vertexShaderCode = document.getElementById("vertexShaderCode").text;
 
     //membuat vertex 
     var vertexShader = gl.createShader(gl.VERTEX_SHADER);
     gl.shaderSource(vertexShader, vertexShaderCode);
     gl.compileShader(vertexShader);
 
     /*var fragmentShaderCode = `
     void main(){
         gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
     }`;*/
 
    var fragmentShaderCode = document.getElementById("fragmentShaderCode").text;
 
     //membuat warna
     var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
     gl.shaderSource(fragmentShader, fragmentShaderCode);
     gl.compileShader(fragmentShader);
 
     //membuat package program agar data bisa dieksekusi
     var shaderProgram = gl.createProgram();
     gl.attachShader(shaderProgram, vertexShader);
     gl.attachShader(shaderProgram, fragmentShader);
     gl.linkProgram(shaderProgram);
     gl.useProgram(shaderProgram);
 
     gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
     var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
     var aColor = gl.getAttribLocation(shaderProgram, "a_Color");
     gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5*Float32Array.BYTES_PER_ELEMENT, 0);
     gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 5*Float32Array.BYTES_PER_ELEMENT, 2*Float32Array.BYTES_PER_ELEMENT);
     gl.enableVertexAttribArray(aPosition);
     gl.enableVertexAttribArray(aColor);

     gl.viewport(100, 0, canvas.width, canvas.height);

     var primitive = gl.TRIANGLES;
     var offset = 0;
     var count = 4;

     var dx = 0;
     var dy = 0;
     var dz = 0;
     var udx = gl.getUniformLocation(shaderProgram, 'dx');
     var udy = gl.getUniformLocation(shaderProgram, 'dy');
     var udz = gl.getUniformLocation(shaderProgram, 'dz');
     var speedx = 0.002;
     var speedy = 0.0015;
    //  var speedz = 0.005;

     //elemen interaktif
     var freeze = false;
     function onMouseClick(event){
         freeze = !freeze;
     }
     document.addEventListener('click', onMouseClick, false);

     function onKeyDown(event){
         if(event.keyCode == 32) freeze = true;
     }

     function onKeyUp(event){
         if(event.keyCode == 32) freeze = false;
     }
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    function render(){
        if(!freeze){
            if(dx >= 0.7 || dx <= -0.5)
            {
                speedx = -speedx;
            }
            if(dy >= 0.1 || dy <= -0.6)
            {
                speedy = -speedy;
            }
            // if(dz >= 0.5 || dz <= -0.5)
            // {
            //     speedz = -speedz;
            // }
           
            // dx += speedx;
            dy += speedy;
            // dz += speedz;
            
            
            
        }
        gl.uniform1f(udx, dx);
        gl.uniform1f(udy, dy);
        gl.uniform1f(udz, dz);

        //mendefinisikan background
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 21);
        
        requestAnimationFrame(render);
    }
     requestAnimationFrame(render);
 }