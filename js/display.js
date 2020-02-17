const Display = function(canvas) {

    this.buffer  = document.createElement("canvas").getContext("2d"),
    this.context = canvas.getContext("2d");
    this.background = new Image();

    this.tile_sheet = new Display.TileSheet(16, 8);

    this.drawMap = function(map, columns) {

      for(let i = map.length - 1; i > -1; --i) {

        let val = map[i] - 1;
        let src_x = (val % this.tile_sheet.columns) * this.tile_sheet.tile_size;
        let src_y = Math.floor(val / this.tile_sheet.columns) * this.tile_sheet.tile_size;
        let dest_x = (i % columns) * this.tile_sheet.tile_size;
        let dest_y = Math.floor(i / columns) * this.tile_sheet.tile_size;

        this.buffer.drawImage(this.tile_sheet.image, src_x, src_y, this.tile_sheet.tile_size,
          this.tile_sheet.tile_size, dest_x, dest_y, this.tile_sheet.tile_size,
          this.tile_sheet.tile_size);
      }
    }

    this.drawPlayer = function(rectangle, color1, color2) {
      this.buffer.fillStyle = color1;
      this.buffer.fillRect(Math.round(rectangle.x), Math.floor(rectangle.y), rectangle.width, rectangle.height);
      this.buffer.fillStyle = color2;
      this.buffer.fillRect(Math.round(rectangle.x + 2), Math.floor(rectangle.y + 2), rectangle.width - 4, rectangle.height - 4);
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

  Display.TileSheet = function(tile_size, columns) {

    this.image = new Image();
    this.tile_size = tile_size;
    this.columns = columns;

  }

  Display.TileSheet.prototype = {};