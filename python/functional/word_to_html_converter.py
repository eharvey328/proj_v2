from pathlib import Path
import xml.etree.ElementTree as ET
import pypandoc, sys, os

def convert_docx_to_html(filename: str):
    problem_characters = ['-',' ']
    new_filename = filename.replace('.docx','.html')
    for c in problem_characters:
        new_filename = new_filename.replace(c,'')
    print(f'Converting {filename} to {new_filename}')
    pypandoc.convert_file(filename,'html',outputfile=new_filename)
    return new_filename

def add_html_wrapper(filepath):
    print(f'Adding <html> tags to {filepath}')
    s = ''
    with open(filepath, 'r') as f:
        s = f.read()
        s = '<html>' + s + '</html>'
    
    with open(filepath, 'w') as f:
        f.write(s)
    
def format_produced_html_file(filepath, add_wrapper=False):
    print(f'Formatting {filepath}')
    if(add_wrapper): add_html_wrapper(filepath)
    tree = ET.parse(filepath)
    root = tree.getroot()

    def get_table_styles():
        style = ET.Element('style')
        style.text = '''
        table, th, td {
            border: 1px solid black;
        }

        td {
            padding-left: 20px;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-right: 20px;
        }

        th {
            padding-left: 20px;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-right: 20px;
        }
        
        '''
        return style

    # Set up head tag
    head = ET.Element('head')
    # head.append(get_table_styles())

    # Set up body tag
    body = ET.Element('body')

    children = root.findall('*')
    for child in children:
        root.remove(child)
        body.append(child)

    root.append(head)
    root.append(body)

    tree.write(filepath, encoding='UTF-8')

    return filepath

def html_to_jsx_component_converter(html_filepath, jsx_dir_filepath):
    component_name = html_filepath.split('/')[-1].replace('.html','') + "Component"
    savepath = jsx_dir_filepath +'/'+component_name+'.jsx'

    print(f'Converting {html_filepath} to {savepath}')
    html_string = ''
    with open(html_filepath, 'r') as f:
        html_string = f.read()
        html_string = html_string.replace('style="width:100%;"','')

    jsx_string = f'''
function {component_name} (){{
    return (
        <div dangerouslySetInnerHTML={{{{__html: `{html_string}`}}}}>
        </div>
    )
}}

export {{{component_name}}}
    '''
    
    with open(savepath,'w') as f:
        f.write(jsx_string)

    return component_name, savepath

def turn_docx_into_jsx_component(file_to_convert, jsx_dir_path):
    html_filepath = convert_docx_to_html(file_to_convert)
    html_filepath = format_produced_html_file(html_filepath, True)
    component_name, jsx_path = html_to_jsx_component_converter(html_filepath, jsx_dir_path)

    return component_name, jsx_path

def convert_dir_of_docx_files_into_jsx_components(docx_dir_path, root_save_dir=''):
    '''
    Returns the root save directory (0) and the new jsx directory (1)
    '''
    components_created = []
    paths_to_components = []

    if(root_save_dir == ''): root_save_dir = os.getcwd() 

    jsx_dir_path = root_save_dir+'/jsx_files'
    os.mkdir(jsx_dir_path)

    for f in os.listdir(docx_dir_path):
        if(f[-4:] != 'docx'): continue
        c,p = turn_docx_into_jsx_component(docx_dir_path+'/'+f, jsx_dir_path)
        components_created.append(c)
        paths_to_components.append(
            '/'.join(Path(p).parts[1:])
        )
    
    exports_filepath = root_save_dir + '/page_exports.jsx'
    
    with open(exports_filepath,'w') as e:
        print(f'Creating {exports_filepath}')
        import_string = ''
        export_string = 'export {'
        for i in range(len(components_created)):
            import_string += f'import {{{components_created[i]}}} from "./{paths_to_components[i]}"; \n'
            export_string += f' {components_created[i]},'
        
        export_string = export_string[:-1] +'};'

        e.write(import_string)
        e.write(export_string)
    
    return root_save_dir, jsx_dir_path
    
if __name__ == '__main__':

    args = sys.argv

    if(len(args)!= 3): raise ValueError('python word_to_html_converter.py <DOCX_PATH> <JSX_ROOT_SAVE_PATH')

    convert_dir_of_docx_files_into_jsx_components(args[1], args[2])