import xml.etree.ElementTree as ET
from functional.jsx_component import ElementJSX

def get_component_import_string_and_list_from_page_exports_filepath(src_root_filepath):
    export_line = ''
    page_exports_filepath = src_root_filepath+'/page_exports.jsx'
    with open(page_exports_filepath,'r') as e:
        export_line = e.readlines()[-1]

    component_names: list[str] = export_line.split(', ')

    component_names[0] = component_names[0].split(' ')[-1]
    component_names[-1] = component_names[-1].split('}')[-2]

    import_string: str = f'import {{{", ".join(component_names)}}} from "./page_exports.jsx";'

    return import_string, component_names

def construct_jsx_component_string(component_name, component_jsx):
    return f'''function {component_name}(){{
    return (
        {component_jsx}
    )
}}
'''

def construct_home_page(component_names: list[str], src_root_dir):
    homeRoot = ET.Element('div')
    homeRoot.attrib['className'] = 'Home'

    ol = ET.Element('ol')

    homeRoot.append(ol)

    for c in component_names:
        li = ET.Element('li')
        a = ET.Element('a')
        a.set('href', f"/{c.replace('Component','')}")
        a.text = c.replace('Component','')

        li.append(a)
        ol.append(li)
    
    home_component_jsx_string = ET.tostring(homeRoot,'UTF-8').decode('utf-8')

    component_string = construct_jsx_component_string('Home', home_component_jsx_string)

    f_string = component_string + f'\nexport {{ Home }}'

    with open(src_root_dir +'/Home.jsx','w') as f:
        f.write(f_string)

def construct_app_file(import_string: str, component_names: list[str], src_root_dir):
    import_string = """import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Home.jsx';
""" + import_string +'\n'

    f_string = import_string + '\n'

    appRoot = ElementJSX('div')
    appRoot.set('className','"App"')

    router = ElementJSX('BrowserRouter')
    appRoot.append(router)

    routes = ElementJSX('Routes')
    router.append(routes)

    route = ElementJSX('Route')
    route.set('path','"/"')
    route.set('element','{<Home/>}')
    routes.append(route)

    for c in component_names:
        route = ElementJSX('Route')
        route.set('path', f"'/{c.replace('Component','')}'")
        route.set('element', f"{{<{c}/>}}")

        routes.append(route)
    
    app_component_jsx_string = str(appRoot)

    component_string = construct_jsx_component_string('App', app_component_jsx_string)

    f_string += component_string + f'\nexport {{ App }}'

    with open(src_root_dir +'/App.jsx','w') as f:
        f.write(f_string)

# src_root = './jsx'
# i_stirng, c_list = get_component_import_string_and_list_from_page_exports_filepath(src_root)
# construct_home_page(c_list, src_root)
# construct_app_file(i_stirng, c_list, src_root)