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
      * A (-0.5, 0.5); B(-0.5, -0.5); C(0.5, -0.5)
      */
     var vertices = [
         -0.5, 0.88,
         -0.54,0.875, 
         -0.46,0.875,   
         -0.63, 0.82,  
         -0.37, 0.82,  
         -0.68,0.7, 
         -0.32,0.7,
         -0.69,0.6, 
         -0.31,0.6,
         -0.68,0.55, 
         -0.32,0.55,
         -0.64, 0.51,  
         -0.36, 0.51,
         -0.54,0.46, 
         -0.46,0.46,
         -0.535,-0.26, 
         -0.465,-0.26,
         -0.53,-0.28, 
         -0.47,-0.28,
         -0.517,-0.285, 
         -0.483,-0.285,
        
     ];
 
     var positionBuffer = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
     gl.bindBuffer(gl.ARRAY_BUFFER, null);
 
     var vertexShaderCode = `
     attribute vec2 a_Position;
     void main(){
         gl_Position = vec4(a_Position, 0.0, 1.0);
         gl_PointSize = 20.0;
     }`;
 
     //var vertexShaderCode = document.getElementById("vertexShaderCode").text;
 
     //membuat titik tsb
     var vertexShader = gl.createShader(gl.VERTEX_SHADER);
     gl.shaderSource(vertexShader, vertexShaderCode);
     gl.compileShader(vertexShader);
 
     var fragmentShaderCode = `
     void main(){
         gl_FragColor = vec4(0.8, 0.8, 0.8, 1.0);
     }`;
 
     //var fragmentShaderCode = document.getElementById("fragmentShaderCode").text;
 
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
 
     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
     var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
     gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
     gl.enableVertexAttribArray(aPosition);
 
     //mendefinisikan background
     gl.clearColor(1.0, 1.0, 0.88, 1.0);
     gl.clear(gl.COLOR_BUFFER_BIT);
 
     gl.drawArrays(gl.TRIANGLE_STRIP, 0, 21);
 }

 