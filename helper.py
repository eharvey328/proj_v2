def construct_routes(list_of_routes):

    for route in list_of_routes:
        route = route[:-3]
        print(f'<Route path="{route}" element={{<e.{route}Component />}} />')

    print()
    for route in list_of_routes:
        route = route[:-3]
        print(f'{route}Component,')

    print()
    print("<ol>")
    for route in list_of_routes:
        route = route[:-3]
        print(f'<li><a href="/{route}">{route}</a></li>')
    print("</ol>")

    print()

import os

routes = os.listdir('/Users/philip.gessen/Development/Dad/NewVersion/html_files/sofya/src/pages/js_files')

construct_routes(routes)