const Display = function(canvas) {

    this.buffer  = document.createElement("canvas").getContext("2d"),
    this.context = canvas.getContext("2d");
    this.background = new Image();
    this.tile_sheet = new Game.World.TileSet(16, 4);

    this.drawMap = function(map, columns, image) {
      
      for(let i = map.length - 1; i > -1; --i) {
        let val = map[i] - 1;
        let src_x = (val % this.tile_sheet.columns) * this.tile_sheet.tile_size;
        let src_y = Math.floor(val / this.tile_sheet.columns) * this.tile_sheet.tile_size;
        let dest_x = (i % columns) * this.tile_sheet.tile_size;
        let dest_y = Math.floor(i / columns) * this.tile_sheet.tile_size;

        this.buffer.drawImage(image, src_x, src_y, this.tile_sheet.tile_size,
          this.tile_sheet.tile_size, dest_x, dest_y, this.tile_sheet.tile_size,
          this.tile_sheet.tile_size);
      }
    }

    this.drawObject = function(image, source_x, source_y, destination_x, destination_y, width, height) {
      this.buffer.drawImage(image, source_x, source_y, width, height, Math.round(destination_x), Math.round(destination_y), width, height);
    }
  
    this.fill = function(color) {
  
      // this.buffer.drawImage(background, this.buffer.canvas.width, this.buffer.canvas.height);
      this.buffer.fillStyle = color;
      this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
  
    };
    
    this.resize = function(width, height, height_width_ratio) {
  
      if (height / width > height_width_ratio) {
  
        this.context.canvas.height = width * height_width_ratio;
        this.context.canvas.width = width;
  
      } else {
  
        this.context.canvas.height = height;
        this.context.canvas.width = height / height_width_ratio;
  
      }
  
      this.context.imageSmoothingEnabled = false;
  
    };
  
  };
  
  Display.prototype = {

    constructor : Display,
    render: function() { 
      this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height); }
  
  };