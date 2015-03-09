<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package timmerdorp
 */
 
get_header(); ?>

<?php $args = array(
	'sort_order' => 'ASC',
	'sort_column' => 'menu_order',
	'orderby'=> 'menu_order',
	'order' => 'ASC',
	'hierarchical' => 1,
	'post_type' => 'page',
	'post_status' => 'publish'
); 
$pages = get_pages($args); 
		 

	foreach($pages as $key => $value){
		 
		 
		 if(get_post_meta($value->ID,'wpcf-homepage',true) > 0){
		 		echo show_page($value->post_name,$value->ID);
		 }
	}
?>


<?php
	
	function show_page($page_name,$page_id){
				
		$path = get_theme_root().'/'.wp_get_theme();
		
		if(file_exists($path.'/templates/'.$page_name.'.php')){
			$html = file_get_contents($path.'/templates/'.$page_name.'.php');
		} else {
			$html = file_get_contents($path.'/templates/default.php');
		}
		
		$recent = new WP_Query("pagename=".$page_name); 
		

		while($recent->have_posts()) {
				 $recent->the_post();

// DO STUFF WITH ELEMENTS

			$content = get_the_content();
			$content = filter_ptags_on_images($content);
			$content = apply_filters('the_content', $content);

		 	 switch($page_name) {
			 	 
				    case 'home':
						    $html = str_replace('{name}',$page_name,$html); 
								$html = str_replace('{title}',get_the_title(),$html); 
								$html = str_replace('{content}',$content,$html); 	
								
								$header = file_get_contents($path.'/templates/slider.php');
								
								
								$item = file_get_contents($path.'/templates/'.$page_name.'-item.php');
								$items = '';								
								$menus = '';
								
								$item_args = array(
										'child_of' => $page_id,
										'sort_column' => 'menu_order'
								);
								$item_array = get_pages($item_args); 
																		
								foreach($item_array as $value){	
									$item = file_get_contents($path.'/templates/'.$page_name.'-item.php');																													 								
									$item = str_replace('{name}',$value->post_name,$item); 
									$item = str_replace('{title}',$value->post_title,$item); 
									$item = str_replace('{content}',$value->post_content,$item); 	
									$item = str_replace('{color}',get_post_meta($value->ID,'wpcf-color',true),$item); 	
									$item = str_replace('{image}',get_post_meta($value->ID,'wpcf-foto',true),$item); 	
									$item = str_replace('{link}',$value->guid,$item); 	
									$items .= $item;
									
									$menu = file_get_contents($path.'/templates/'.$page_name.'-menu.php');																											 										
									$menu = str_replace('{name}',$value->post_name,$menu); 
									$menu = str_replace('{title}',$value->post_title,$menu); 
									$menu = str_replace('{color}',get_post_meta($value->ID,'wpcf-color',true),$menu); 
									$menus .= $menu;
								}
																
								$html = str_replace('{items}',$items,$html); 
								$html = str_replace('{items-menu}',$menus,$html); 
									
				        break;
				    
				    default:
						    $html = str_replace('{name}',$page_name,$html); 
								$html = str_replace('{title}',get_the_title(),$html); 
								$html = str_replace('{content}',$content,$html); 	
				        break;	 
				        
				     }
				 
		}
		return $html;
		
	}
?>


<?php get_footer(); ?>
