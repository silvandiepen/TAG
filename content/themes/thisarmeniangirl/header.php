<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package timmerdorp
 */
?>



<!doctype html>
<html <?php language_attributes(); ?>>
<head>

	<meta charset="UTF-8" />
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
	
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	
	<title><?php the_title(); ?> - Timmerdorp Heiloo</title>
	
	<?php //wp_head(); ?>
	
	<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri();?>/css/app.css" />
	<link href="https://fontastic.s3.amazonaws.com/DVeXkEEMbVYXf4sLKgCYPR/icons.css" rel="stylesheet">
	
	<script src="<?php echo get_template_directory_uri();?>/js/jquery-2.1.1.js" type="text/javascript"></script>
	<script src="<?php echo get_template_directory_uri();?>/js/getlist.js" type="text/javascript"></script>
	<script src="<?php echo get_template_directory_uri();?>/js/moment.js" type="text/javascript"></script>
	<script src="<?php echo get_template_directory_uri();?>/js/jquery.browser.js" type="text/javascript"></script>
	<script src="<?php echo get_template_directory_uri();?>/js/slick/slick.min.js" type="text/javascript"></script>
	<script src="<?php echo get_template_directory_uri();?>/js/jquery.autocomplete.js" type="text/javascript"></script>
	<script src="<?php echo get_template_directory_uri();?>/js/jquery.viewport.js" type="text/javascript"></script>
	<script src="<?php echo get_template_directory_uri();?>/js/jquery.papi.js" type="text/javascript"></script>
	<script src="http://maps.googleapis.com/maps/api/js?v=3&sensor=true" type="text/javascript" ></script>
	<script src="<?php echo get_template_directory_uri();?>/js/gmaps.js" type="text/javascript"></script>	
	<script src="<?php echo get_template_directory_uri();?>/js/app_functions.js" type="text/javascript"></script>	
	<script src="<?php echo get_template_directory_uri();?>/js/sil.modal.js" type="text/javascript"></script>	
	<script src="<?php echo get_template_directory_uri();?>/js/sil.equalizer.js" type="text/javascript"></script>	
	<script src="<?php echo get_template_directory_uri();?>/js/sil.mobilecheck.js" type="text/javascript"></script>	
</head>
<body class="home">
	<header>
		
		<div class="row">
			<div class="small-12">
				<div class="row">
					<div class="small-6 text-left">
				
						<h1><a href="#">This <strong>Armenian Girl</strong></a></h1>
						
					</div>
					<div class="small-6 text-right">
				
						<a class="search" href="#">Search</a>
						
					</div>
				</div>
			</div>
		</div>
		
	</header>
	

	<section id="header">
		
		<div class="slider">
		<?php
			
				$item_args = array(
		        'numberposts' => 3,
		        'post_type' => 'post',
		    );
				$item_array = get_posts($item_args); 
				$path = get_theme_root().'/thisarmeniangirl';
				$items = '';	
				
/*
				echo '<pre>';
				print_r($item_array);
				echo '</pre>';
*/
				
				foreach($item_array as $value){										
										
					echo get_the_post_thumbnail( $value->ID);
										
					$item = file_get_contents($path.'/templates/header-item.php');	
					$item = str_replace('{title}',$value->post_title,$item); 
					$item = str_replace('{image}',get_the_post_thumbnail( $value->ID, 'large'),$item); 		
					$item = str_replace('{link}',get_post_meta($value->ID,'wpcf-link',true),$item); 		
					$items .= $item;
					
				}							
				echo $items;
												
		?>
		</div>
	</section>
	
	
		<div class="headertop">
			<div class="row">
				<div class="mini-12">
					<nav id="top">
						
						<?php wp_nav_menu( array( 'theme_location' => 'header-topmenu', 'container'  => '', 'items_wrap' => '<ul class="navigation">%3$s</ul>') ); ?>

<!--
			<ul>
				<li><a href="#">Timmerlui aanmelden</a></li>
					<li><a href="#">Nieuwsbrief</a></li>
				<li><a href="#">Contact</a></li>
			</ul>
-->
				</nav>
			</div>
			</div>
		</div>
	
	</header>
	
	<nav id="main">
<?php wp_nav_menu( array( 'theme_location' => 'header-mainmenu', 'container'  => '', 'items_wrap' => '<ul class="navigation">%3$s</ul>') ); ?>
<!--
		<ul>
			<li><a href="#">Nieuws</a></li>
			<li><a href="#">Informatie</a></li>
			<li><a href="#">Programma</a></li>
			<li><a href="#">Foto's &amp; Videos</a></li>
			<li><a href="#">Sponsors</a></li>
		</ul>
-->
	</nav>
