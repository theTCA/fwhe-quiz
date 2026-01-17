start
	= Character Numbers

Character
	= "x"i {return {extra: true}}
    / "" {return {extra: false}}

Double
	= a:Zero|2| {return {double: true, val: a.at(0)}}
    / a:One|2|{return {double: true, val: a.at(0)}}
    / a:Two|2|{return {double: true, val: a.at(0)}}
    / a:Three|2|{return {double: true, val: a.at(0)}}
    / a:Four|2|{return {double: true, val: a.at(0)}}
    / a:Five|2|{return {double: true, val: a.at(0)}}
    / a:Six|2|{return {double: true, val: a.at(0)}}
    / a:Seven|2|{return {double: true, val: a.at(0)}}
    / a:Eight|2|{return {double: true, val: a.at(0)}}
    / a:Nine|2|{return {double: true, val: a.at(0)}}

Numbers
	= a:Double b:Number? {return {primary: a, secondary: b}}
    / a:Number b:Number|1..2| {return {primary: {double: false, val:a}, secondary: b}}

Number
	= Zero / One / Two / Three / Four / Five / Six / Seven / Eight / Nine

Zero = "0"

One	= "1"

Two	= "2"

Three = "3"

Four = "4"

Five = "5"

Six	= "6"

Seven = "7"

Eight = "8"

Nine = "9"