import BlogHeader from "./header";
import Link from "next/dist/client/link";
export default function EditBlog(context){
    return (
        <div>
        <BlogHeader></BlogHeader>
        <section class="container page">
		<div class="page-block">

			<div class="page-header">
				<h2>Редактировать</h2>
			</div>
			
			<form class="form">
				
			<fieldset class="fieldset">
				<input class="input" type="text" name="title" placeholder="Заголовок"/>
			</fieldset>

			<fieldset class="fieldset">
				<select name="category_id" id="" class="input">
					
					<option value="1">Прогнозы в IT</option>
				</select>
			</fieldset>
			
			<fieldset class="fieldset">
				<button class="button button-yellow input-file">
					<input type="file" name="image"/>	
					Выберите картинку
				</button>
			</fieldset>
				
			<fieldset class="fieldset">
				<textarea class="input input-textarea" name="description" id="" cols="30" rows="10" placeholder="Описание"></textarea>
			</fieldset>
			<fieldset class="fieldset">
				<Link href = '/profile'><button class="button" type="submit">Сохранить</button></Link>;
			</fieldset>
			</form>

			



		</div>

	</section>
        </div>
        )
}