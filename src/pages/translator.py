unicode_to_cyrillic = {
    'xd041': 'А',
    'xd042': 'Б',
    'xd0422': 'В',
    'xd0413': 'Г',
    'xd0414': 'Д',
    'xd0415': 'Е',
    'xd0416': 'Ж',
    'xd0417': 'З',
    'xd0418': 'И',
    'xd0419': 'Й',
    'xd041a': 'К',
    'xd041b': 'Л',
    'xd041c': 'М',
    'xd041d': 'Н',
    'xd041e': 'О',
    'xd041f': 'П',
    'xd0420': 'Р',
    'xd0421': 'С',
    'xd0422': 'Т',
    'xd0423': 'У',
    'xd0424': 'Ф',
    'xd0425': 'Х',
    'xd0426': 'Ц',
    'xd0427': 'Ч',
    'xd0428': 'Ш',
    'xd0429': 'Щ',
    'xd042a': 'Ъ',
    'xd042b': 'Ы',
    'xd042c': 'Ь',
    'xd042d': 'Э',
    'xd042e': 'Ю',
    'xd042f': 'Я'
    # You can add more mappings for different characters if needed
}

import os
import re
# import bytes

jsfiles = os.listdir('js_files')

p = r'xd0x[0-9A-Fa-f]+'

for f in jsfiles:
    with open(f'js_files/{f}', 'r') as fl:
        s = fl.read()
        
        # m = re.findall(p,s)

        # print(m)

        while(len(l := re.finditer(p,s)) != 0):
            m = l[0]
            print(m)
            hex_of_letter = s[m.span()[0]+4:m.span()[1]]
            print(m)
            print(hex_of_letter)
            letter = bytes.fromhex(hex_of_letter).decode('Windows-1251')
            print(hex_of_letter, letter)
            s = s[:m.span()[0]] + letter + s[m.span()[1]:]
        
        with open('filt.html','w') as fh:
            fh.write(s)
        
        exit()