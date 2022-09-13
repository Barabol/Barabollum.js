# Barabollum.js V 1.0.0
![logo](https://cdn.discordapp.com/attachments/970467384710270976/1017755108735455242/unknown.png) <br />
# Commands <br />
### values tagged with '*' are not required

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
- ### set_pozition ( place )
> sets where objects are shown
> - place where objects are rendered 
- ### set_size( name , width , height )
> set size of object
> - name of the object
> - width of the object
> - height of the object
- ### hide( name )
> hides object
> - name of the object
- ### show( name )
> shows object
> - name of the object
- ### set_transparency( name , transparency )
> sets transparency of object
> - name of the object
> - transparency of object

## layer functions <br />
- ### set_layer( name , layer )
> sets layer of object
> - name of the object
> - layer of object

## movement functions <br />

- ### move_to( name , x , y )
> move to exact X and Y
> - name of the object
> - x of the object
> - y of the object
- ### move_by( name , x , y )
> move by X and Y
> - name of the object
> - adition to x of the object
> - adition to y of the object
-### slide_to( name , x , y , speed )
> slide to X and Y by moving speed px/fps 
> - name of the object
> - x of the object
> - y of the object
> - speed in px/fps
- ### slide_by( name , x , y , speed )
> slide by X and Y by moving speed px/fps 
> - name of the object
> - adition to x of the object
> - adition to y of the object
> - speed in px/fps
> - time it will take to slide to given x and y
- ### give_static_momentum( name , momentum )
> sets static momentum
> - name of the object
> - momentum as an array

## get functions <br />

- ### get_speed_by( x , y , time )
> calculates px/fps 
> - how many px in x direction object will travel in time
> - how many px in y direction object will travel in time
> - desired time 
- ### get_speed_to( name , x , y , time )
> calculates px/fps 
> - name of the object
> - how many px in x direction object will travel in time
> - how many px in y direction object will travel in time
> - desired time 
- ### is_sliding( name )
> returns true if object is sliding
> - name of the object
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
- ### is_hidden( name )
> returns true if object is hidden
> - name of the object
- ### get_layer( name )
> returns layer of object
> - name of the object
- ### get_momentum( name )
> returns momentum as an array [x,y]
> - name of the object
- ### get_transparency( name )
> returns transparency
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
# How x and y are used
## Screen
![sg](https://user-images.githubusercontent.com/105214028/189426620-5b8399d9-0f14-4d6e-b0a9-68ff372ef9a8.png)

## Object
![sgg](https://user-images.githubusercontent.com/105214028/189426600-bd0e9953-87cd-490a-9fa2-f026623e446d.png)
# Example code


        let a=0
        set_process(
            function(){
                
                if(a==1 )
                    texture("example2","!logo.png")
                else if(a==0 )
                    texture("example2","!")
                
                if(a==0 & !is_sliding("example1")){
                    slide_by("example1",100,100,get_speed_by(100,100,2))
                    a=1
                }
                    
                else if(a==1 & !is_sliding("example1")){
                    slide_by("example1",-100,-100,get_speed_by(-100,-100,2))
                    a=0
                }
                    
            }   
        )
        init(
            function(){
                new_obj(50,50,"example1")
                new_obj(50,50,"example2")
                give_collision("example1")
                give_collision("example2")
            }
        )
        
        
![bez tytułu](https://user-images.githubusercontent.com/105214028/189426067-cf650d7a-f310-4042-9cf0-e9009ad48119.gif)
        
