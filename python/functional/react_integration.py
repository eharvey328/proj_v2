from __future__ import annotations
import xml.etree.ElementTree as ET
from functional.jsx_component import ElementJSX

base_route='/'
router = 'BrowserRouter'

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
    global router, base_route
    import_string = 'import { Link } from "react-router-dom"\n'

    homeRoot = ElementJSX('div')
    homeRoot.set('className', '"Home"')

    ol = ElementJSX('ol')
    ol.set('style','{{"list-style-type": "none"}}')

    homeRoot.append(ol)

    component_names = sorted(component_names)

    for c in component_names:
        li = ElementJSX('li')
        a = ElementJSX('Link')
        a.set('to', f"'{base_route}{c.replace('Component','')}'")
        a.append(c.replace('Component','').replace('_',' '))

        li.append(a)
        ol.append(li)
    
    home_component_jsx_string = str(homeRoot)

    component_string = construct_jsx_component_string('Home', home_component_jsx_string)

    f_string = import_string + component_string + f'\nexport {{ Home }}'

    with open(src_root_dir +'/Home.jsx','w') as f:
        f.write(f_string)

def construct_app_file(import_string: str, component_names: list[str], src_root_dir):
    global router, base_route

    import_string = f"""import './App.css';
import {{ {router}, Routes, Route }} from 'react-router-dom';
import {{ Home }} from './Home.jsx';
""" + import_string +'\n'

    f_string = import_string + '\n'

    appRoot = ElementJSX('div')
    appRoot.set('className','"App"')

    router = ElementJSX(router)
    appRoot.append(router)

    routes = ElementJSX('Routes')
    router.append(routes)

    route = ElementJSX('Route')
    route.set('path',f'"{base_route}"')
    route.set('element','{<Home/>}')
    routes.append(route)

    for c in component_names:
        route = ElementJSX('Route')
        route.set('path', f"'{base_route}{c.replace('Component','')}'")
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