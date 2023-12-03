import os
import chardet

# class SinglePage:

# Create a class for every page
# Have class generate the components necessary for every aspect in the app
# If you made exports with JSX you would be able to make the components in that way as well, meaning you would be able to directly export them into JS
# Create a directory that holds all of your components. Add a "Route generator" and "Button generator" for each components
# Have an auto-generated list with names that you would be able to copy and paste into an array and iterate over to make your webpage

def construct_js_file_from_html(file_id, source_dir="./html_sources", save_path="./js_files"):
    
    save_str = ""
    with open(source_dir+"/"+file_id+".html", "r") as f:
        save_str += f"const {file_id}Html = `"
        # print(file_id, chardet.detect(f.read()))
        # save_str += bytes.decode(f.read(), encoding='utf-8')
        save_str += f.read()
        save_str += "` \n"
        save_str += "export {" + file_id + "Html  }"

    with open(save_path + '/' + file_id + '.jsx', 'w') as f2:
        f2.write(save_str)

    return file_id +".jsx"

def create_export_file(source_filenames, save_path = './js_files'):
    with open(save_path + "/page_sources.jsx", "w") as export_file:
        p1 = "export {" 
        #FileID
        p2 = "Html } from './"
        #Filename
        p3 = "'\n"

        for f in source_filenames:
            line_to_write = p1 + f[:-4] + p2 + f + p3
            print(line_to_write)
            export_file.write(line_to_write)

def print_export_statement(source_filenames):
    print_str = ''
    for f in source_filenames:
        print_str += f[:-4] + "Html, "
    print(print_str)

if __name__ == "__main__":
    files_created = []
    for filename in os.listdir("./html_sources"):
        if(filename[-4:] == "html"):
            files_created.append(construct_js_file_from_html(filename[:-5]))

    create_export_file(files_created)
    print_export_statement(files_created)