from __future__ import annotations

class ElementJSX:

    def __init__(self, name: str):
        self.name = name
        self.attributes: dict[str,str] = {}
        self.children = []

    def set(self, a, b):
        self.attributes[a]=b

    def append(self, el: ElementJSX):
        self.children.append(el)

    def __str__(self):
        internal_str = ''

        for c in self.children:
            internal_str += f'{str(c)}\n'

        attr_string = ''

        for k,v in self.attributes.items():
            attr_string += f' {k}={v}'

        return f'<{self.name}{attr_string}>\n{internal_str}</{self.name}>'

router = ElementJSX('BrowserRouter')
routes = ElementJSX('Routes')

router.append(routes)
routes.set('number','"12"')

print(router)