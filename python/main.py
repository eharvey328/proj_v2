from functional.word_to_html_converter import convert_dir_of_docx_files_into_jsx_components
from functional.react_integration import construct_app_file, construct_home_page, get_component_import_string_and_list_from_page_exports_filepath

# Conversions
# root_path, jsx_filepath = convert_dir_of_docx_files_into_jsx_components('cleaner_names', 'src')
root_path = 'src'

# React router creation
i_stirng, c_list = get_component_import_string_and_list_from_page_exports_filepath(root_path)
construct_home_page(c_list, root_path)
construct_app_file(i_stirng, c_list, root_path)