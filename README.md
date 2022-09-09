# Barabollum.js
![logo](https://cdn.discordapp.com/attachments/970467384710270976/1017755108735455242/unknown.png) <br />
# Commands <br />
### values tagged with '*' aren't required

## initial functions <br />

- ### init( *function() , *FPS )
> initialize moast important processes
> - function(){anything that should be executed only once}
> - FPS are set to 30 by default
- ### set_process( function() )
> let you set processes that will be executed evry frame
> - function(){anything that should be executed evry frame}

## alternating with refreshes functions <br />

- ### pause()
> - pause program
- ### resume()
> - resume paused program
- ### stop()
> - stops program
 
## error messages functions <br />
 
> errors are on by default
- ### errors_on()
> turns on errors
- ### errors_off()
> turns off errors

## object manimulation

- ### new_obj( width , height , name , *initial X , *initial Y)
> create new object
> - width of the object
> - height of the object
> - name of the object
> - initial X is starting x of the object
> - initial Y is starting y of the object
- ### del_obj( name )
> delete object
> - name of the object
- ### texture( name , texture , *size of image , *offset of image , *repeating of image)
> set texture on object
> - name of the object
> - texture ( link to img starts with !("!img.png") , hex color starts with #(#FFFFFF) , RGB writen as an array([10,10,10])) 
> - size of image rendered inside of an object as array ([100,100])
> - offset of image rendered inside of an object
> - repeating of image if it is smaller than object
- ### set_size( name , width , height )
> set size of object
> - name of the object
> - width of the object
> - height of the object
## movement functions <br />

- ### move_to( name , x , y )
> move to exact X and Y
> - name of the object
> - width of the object
> - height of the object
- ### move_by( name , x , y )
> move by X and Y
> - name of the object
> - width of the object
> - height of the object
- ### slide_by( name , x , y , speed )
> slide by X and Y by moving speed px/fps 
> - name of the object
> - width of the object
> - height of the object
> - speed in px/fps
- ### get_speed_by( x , y , time )
> calculates px/fps 
> - how many px in x direction object will travel in time
> - how many px in y direction object will travel in time
> - time it will take to slide to given x and y
- ### is_sliding( name )
> returns true if object is sliding
> - name of the object
## alternating with refreshes functions <br />

- ### get_x( name )
> returns x of an object
> - name of the object
- ### get_y( name )
> returns y of an object
> - name of the object
- ### get_width( name )
> returns width of an object
> - name of the object
- ### get_height( name )
> returns height of an object
> - name of the object
 
## collision functions  <br />

- ### get_collision( name )
> returns true if object has colllision
> - name of the object
- ### give_collision( name )
> gives object collision
> - name of the object
- ### remove_collision( name )
> removes object collision
> - name of the object
- ### is_colliding( name )
> returns true if object is collideing with other objects that has collision
> - name of the object
- ### is_colliding_with( name1 , name2 )
> returns true if #1 object is collideing with #2 object
> - name of the #1 object
> - name of the #2 object
