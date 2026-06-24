"""
Patches lib/data.ts to insert a cmj field after each
`region: "Norte de Antioquia",` line.
"""
import re

DATA_FILE = "lib/data.ts"

# CMJ data per slug, in the order they appear in the file
CMJ_DATA = {
    "angostura": {
        "periodo": "2024 – 2028",
        "fechaPosesion": "15 de enero de 2024",
        "normaLegal": "Acuerdo Municipal N.° 004 de 2024",
        "numeroCurules": 9,
        "mision": "Ser el órgano de representación, interlocución y participación de la juventud angosturana, promoviendo el desarrollo humano, la cultura y el emprendimiento rural.",
        "vision": "En 2028, ser un consejo juvenil reconocido en el Norte de Antioquia por sus propuestas de política pública que transformen las condiciones de vida de los jóvenes rurales.",
        "objetivos": [
            "Promover la participación activa de los jóvenes en los asuntos públicos del municipio.",
            "Gestionar proyectos de emprendimiento rural y agroindustria juvenil.",
            "Fortalecer la identidad cultural y el sentido de pertenencia territorial.",
            "Articularse con la administración municipal para la formulación de política pública de juventud.",
        ],
        "redes": {"instagram": "@cmj_angostura", "facebook": "CMJ Angostura Oficial"},
    },
    "belmira": {
        "periodo": "2024 – 2028",
        "fechaPosesion": "1 de febrero de 2024",
        "normaLegal": "Acuerdo Municipal N.° 002 de 2024",
        "numeroCurules": 7,
        "mision": "Representar a la juventud de Belmira y sus veredas, impulsando la conservación ambiental y el turismo sostenible como motores del desarrollo juvenil.",
        "vision": "Ser referente departamental en gestión ambiental juvenil y ecoturismo comunitario para el año 2028.",
        "objetivos": [
            "Liderar iniciativas de conservación del páramo y los recursos hídricos.",
            "Fomentar el ecoturismo comunitario como fuente de empleo para los jóvenes.",
            "Garantizar espacios de participación para jóvenes rurales y de casco urbano.",
            "Establecer alianzas con universidades y ONG ambientales.",
        ],
        "redes": {"instagram": "@cmjbelmira"},
    },
    "briceno": {
        "periodo": "2024 – 2028",
        "fechaPosesion": "20 de enero de 2024",
        "normaLegal": "Acuerdo Municipal N.° 001 de 2024",
        "numeroCurules": 9,
        "mision": "Contribuir a la reconciliación y construcción de paz en Briceño, abriendo oportunidades para que los jóvenes sean protagonistas del posconflicto y la reintegración social.",
        "vision": "En 2028, ser un consejo que haya transformado la narrativa del municipio, posicionando a sus jóvenes como constructores de paz reconocidos a nivel nacional.",
        "objetivos": [
            "Promover la convivencia pacífica y la reconciliación entre los jóvenes del municipio.",
            "Gestionar oportunidades de formación y empleo para jóvenes en contexto de posconflicto.",
            "Visibilizar las historias y proyectos de vida de la juventud de Briceño.",
            "Articular acciones con la Unidad para las Víctimas y la Agencia para la Reincorporación.",
        ],
        "redes": {"instagram": "@cmj_briceno", "facebook": "CMJ Briceño Paz"},
    },
    "campamento": {
        "periodo": "2024 – 2028",
        "fechaPosesion": "10 de febrero de 2024",
        "normaLegal": "Acuerdo Municipal N.° 003 de 2024",
        "numeroCurules": 7,
        "mision": "Representar a los jóvenes del municipio de Campamento, promoviendo el desarrollo cultural, deportivo y productivo en el territorio.",
        "vision": "Consolidar un consejo activo y propositivo que logre mejorar la calidad de vida de los jóvenes campamentanos mediante la gestión de proyectos de impacto social.",
        "objetivos": [
            "Fortalecer los espacios deportivos y culturales para la juventud.",
            "Gestionar proyectos de formación técnica y emprendimiento.",
            "Garantizar la participación juvenil en los planes de desarrollo municipal.",
            "Promover la salud mental y el bienestar integral de los jóvenes.",
        ],
        "redes": {"instagram": "@cmjcampamento"},
    },
    "carolina-del-principe": {
        "periodo": "2024 – 2028",
        "fechaPosesion": "5 de febrero de 2024",
        "normaLegal": "Acuerdo Municipal N.° 002 de 2024",
        "numeroCurules": 7,
        "mision": "Preservar y difundir el patrimonio histórico y cultural de Carolina del Príncipe mediante la acción juvenil organizada y propositiva.",
        "vision": "Ser un consejo referente en gestión cultural y turística, reconocido por poner a los jóvenes carolineros como guardianes del patrimonio municipal.",
        "objetivos": [
            "Proteger y promover el patrimonio arquitectónico e histórico del municipio.",
            "Impulsar el turismo cultural con los jóvenes como guías y gestores.",
            "Fortalecer las expresiones artísticas locales como la música y la danza.",
            "Crear alianzas con el Ministerio de Cultura y el Instituto de Patrimonio.",
        ],
        "redes": {"instagram": "@cmj_carolinadprincipe", "facebook": "CMJ Carolina del Príncipe"},
    },
    "don-matias": {
        "periodo": "2024 – 2028",
        "fechaPosesion": "20 de febrero de 2024",
        "normaLegal": "Acuerdo Municipal N.° 005 de 2024",
        "numeroCurules": 11,
        "mision": "Articular a los jóvenes de Don Matías con el sector productivo e industrial del municipio, generando oportunidades de empleo, formación y emprendimiento.",
        "vision": "Para 2028, ser un consejo que haya vinculado a más de 500 jóvenes al sector productivo formal del municipio, con programas de formación y pasantías empresariales.",
        "objetivos": [
            "Generar alianzas con empresas textiles y del sector industrial para pasantías juveniles.",
            "Promover el emprendimiento tecnológico y la innovación entre los jóvenes.",
            "Garantizar el acceso a educación técnica y superior para los jóvenes del municipio.",
            "Fortalecer la política pública de juventud articulada con el Plan de Desarrollo.",
        ],
        "redes": {"instagram": "@cmjdonmatias", "tiktok": "@cmjdonmatias"},
    },
    "entrerrios": {
        "periodo": "2024 – 2028",
        "fechaPosesion": "8 de marzo de 2024",
        "normaLegal": "Acuerdo Municipal N.° 002 de 2024",
        "numeroCurules": 7,
        "mision": "Fomentar el bienestar, la participación y el desarrollo integral de los jóvenes de Entrerríos, con énfasis en el cuidado ambiental y la producción agropecuaria sostenible.",
        "vision": "Consolidarnos como un consejo que conecte a los jóvenes con el potencial agropecuario y natural de Entrerríos, generando empleo verde y sostenible.",
        "objetivos": [
            "Promover la agricultura sostenible y la ganadería responsable entre los jóvenes.",
            "Fortalecer el vínculo de los jóvenes con el campo y las tradiciones rurales.",
            "Gestionar proyectos de conectividad y acceso a tecnología en zonas rurales.",
            "Articularse con el SENA para formación técnica agropecuaria.",
        ],
        "redes": {"instagram": "@cmj_entrerrios"},
    },
    "gomez-plata": {
        "periodo": "2024 – 2028",
        "fechaPosesion": "12 de febrero de 2024",
        "normaLegal": "Acuerdo Municipal N.° 003 de 2024",
        "numeroCurules": 7,
        "mision": "Impulsar el desarrollo cultural, artístico y económico de la juventud de Gómez Plata, aprovechando la riqueza patrimonial y minera del municipio de forma responsable.",
        "vision": "Ser un consejo que haya transformado las oportunidades de los jóvenes gómezplateños, con proyectos innovadores en cultura, tecnología y medio ambiente.",
        "objetivos": [
            "Promover expresiones culturales y artísticas autóctonas.",
            "Gestionar proyectos de formación tecnológica y digital.",
            "Impulsar el turismo de aventura y la oferta de ocio saludable para jóvenes.",
            "Fortalecer la participación política juvenil en espacios de decisión municipal.",
        ],
        "redes": {"instagram": "@cmjgomezplata"},
    },
    "guadalupe": {
        "periodo": "2024 – 2028",
        "fechaPosesion": "18 de enero de 2024",
        "normaLegal": "Acuerdo Municipal N.° 001 de 2024",
        "numeroCurules": 7,
        "mision": "Representar a los jóvenes de Guadalupe y promover su participación activa en la vida política, cultural y ambiental del municipio, desde una perspectiva de derechos.",
        "vision": "Construir, junto con la administración municipal, una política pública de juventud que garantice los derechos de todos los jóvenes guadalupanos al 2028.",
        "objetivos": [
            "Fortalecer la participación juvenil en los organismos de decisión municipal.",
            "Promover el cuidado ambiental y la gestión del riesgo con jóvenes.",
            "Articular acciones con el sector salud para garantizar el bienestar juvenil.",
            "Desarrollar proyectos culturales que rescaten las tradiciones locales.",
        ],
        "redes": {"instagram": "@cmjguadalupe_ant"},
    },
    "ituango": {
        "periodo": "2024 – 2028",
        "fechaPosesion": "25 de enero de 2024",
        "normaLegal": "Acuerdo Municipal N.° 002 de 2024",
        "numeroCurules": 9,
        "mision": "Ser la voz de los jóvenes de Ituango en la construcción de paz y el desarrollo sostenible del municipio, en el marco del posconflicto y la transformación social.",
        "vision": "Para 2028, tener un consejo reconocido regionalmente por su liderazgo en procesos de paz, reconciliación y construcción de tejido social con jóvenes ituanguinos.",
        "objetivos": [
            "Liderar procesos de construcción de paz y reconciliación en el municipio.",
            "Gestionar oportunidades educativas y de empleo para los jóvenes.",
            "Promover la participación política y ciudadana de la juventud ituanguina.",
            "Articular acciones con organizaciones nacionales e internacionales de paz.",
        ],
        "redes": {"instagram": "@cmjituango", "facebook": "CMJ Ituango Paz y Futuro"},
    },
    "san-andres": {
        "periodo": "2024 – 2028",
        "fechaPosesion": "15 de febrero de 2024",
        "normaLegal": "Acuerdo Municipal N.° 003 de 2024",
        "numeroCurules": 7,
        "mision": "Representar a la juventud de San Andrés de Cuerquia, promoviendo el desarrollo integral y la participación ciudadana desde una perspectiva de género y diversidad.",
        "vision": "Ser un consejo que haya logrado incluir y representar a todos los sectores juveniles del municipio, sin discriminación, al 2028.",
        "objetivos": [
            "Garantizar la participación de jóvenes de todos los sectores, incluyendo LGBTIQ+ y mujeres.",
            "Promover la equidad de género en los espacios de decisión juvenil.",
            "Fortalecer las organizaciones juveniles del municipio.",
            "Gestionar proyectos de formación en derechos humanos y ciudadanía.",
        ],
        "redes": {"instagram": "@cmj_sanandres"},
    },
    "san-jose-de-la-montana": {
        "periodo": "2024 – 2028",
        "fechaPosesion": "20 de febrero de 2024",
        "normaLegal": "Acuerdo Municipal N.° 002 de 2024",
        "numeroCurules": 7,
        "mision": "Fomentar el desarrollo integral de los jóvenes de San José de la Montaña, con énfasis en la producción lechera sostenible, la educación y la cultura campesina.",
        "vision": "Ser referentes en agro-juventud, promoviendo que los jóvenes sanjosequinos vean en el campo una oportunidad de vida y progreso.",
        "objetivos": [
            "Vincular a los jóvenes con proyectos de agroindustria y lechería sostenible.",
            "Promover la permanencia de los jóvenes en el campo con oportunidades reales.",
            "Fortalecer la identidad cultural campesina entre las nuevas generaciones.",
            "Articularse con el SENA y la Secretaría de Agricultura departamental.",
        ],
        "redes": {"instagram": "@cmjsanjosemontana"},
    },
    "san-pedro": {
        "periodo": "2024 – 2028",
        "fechaPosesion": "1 de marzo de 2024",
        "normaLegal": "Acuerdo Municipal N.° 004 de 2024",
        "numeroCurules": 9,
        "mision": "Promover el desarrollo humano y la participación ciudadana de los jóvenes de San Pedro de los Milagros, integrando cultura, deporte y emprendimiento.",
        "vision": "En 2028, ser un consejo que haya articulado un ecosistema de oportunidades para los jóvenes sanpedrinos, con alianzas sólidas con el sector privado y la academia.",
        "objetivos": [
            "Fortalecer los espacios deportivos y culturales para la juventud.",
            "Crear un fondo de emprendimiento juvenil con recursos gestionados por el consejo.",
            "Promover la educación superior y técnica para jóvenes del municipio.",
            "Articular acciones con las empresas locales del sector ganadero.",
        ],
        "redes": {"instagram": "@cmj_sanpedro", "facebook": "CMJ San Pedro de los Milagros"},
    },
    "santa-rosa-de-osos": {
        "periodo": "2024 – 2028",
        "fechaPosesion": "10 de enero de 2024",
        "normaLegal": "Acuerdo Municipal N.° 001 de 2024",
        "numeroCurules": 13,
        "mision": "Liderar la agenda juvenil de Santa Rosa de Osos, articulando a los jóvenes con las apuestas de desarrollo del municipio capital de la subregión Norte de Antioquia.",
        "vision": "Ser el consejo juvenil más activo y propositivo del Norte de Antioquia, referente en formulación de política pública de juventud a nivel departamental al 2028.",
        "objetivos": [
            "Articular la agenda juvenil con el Plan de Desarrollo Municipal.",
            "Promover el acceso a educación de calidad para todos los jóvenes del municipio.",
            "Fortalecer la participación política y electoral de la juventud santarrosana.",
            "Gestionar proyectos de impacto regional en alianza con los demás CMJ del Norte.",
        ],
        "redes": {"instagram": "@cmj_santarosa", "tiktok": "@cmjsantarosa", "facebook": "CMJ Santa Rosa de Osos"},
    },
    "toledo": {
        "periodo": "2024 – 2028",
        "fechaPosesion": "5 de marzo de 2024",
        "normaLegal": "Acuerdo Municipal N.° 003 de 2024",
        "numeroCurules": 7,
        "mision": "Representar a la juventud de Toledo, impulsando el desarrollo rural, la identidad territorial y la participación activa de los jóvenes en la construcción del municipio.",
        "vision": "Ser un consejo que haya logrado que los jóvenes de Toledo vean en su territorio una tierra de oportunidades, con proyectos sostenibles y de largo plazo.",
        "objetivos": [
            "Fomentar el arraigo territorial y el amor por el campo entre los jóvenes.",
            "Gestionar proyectos productivos agropecuarios con enfoque juvenil.",
            "Promover la formación técnica y el emprendimiento rural.",
            "Articularse con la Gobernación de Antioquia para acceso a programas departamentales.",
        ],
        "redes": {"instagram": "@cmj_toledo_ant"},
    },
    "valdivia": {
        "periodo": "2024 – 2028",
        "fechaPosesion": "12 de marzo de 2024",
        "normaLegal": "Acuerdo Municipal N.° 002 de 2024",
        "numeroCurules": 9,
        "mision": "Promover la participación y el desarrollo de los jóvenes de Valdivia, en el marco de la construcción de paz y el aprovechamiento sostenible de los recursos naturales del municipio.",
        "vision": "Para 2028, ser un consejo que haya contribuido significativamente a la paz territorial y al desarrollo humano de la juventud valdiviense.",
        "objetivos": [
            "Liderar acciones de construcción de paz y convivencia en el municipio.",
            "Gestionar proyectos de aprovechamiento sostenible de los recursos naturales.",
            "Promover el acceso a educación y oportunidades de empleo para los jóvenes.",
            "Fortalecer los vínculos entre los jóvenes urbanos y rurales del municipio.",
        ],
        "redes": {"instagram": "@cmjvaldivia"},
    },
    "yarumal": {
        "periodo": "2024 – 2028",
        "fechaPosesion": "15 de enero de 2024",
        "normaLegal": "Acuerdo Municipal N.° 001 de 2024",
        "numeroCurules": 13,
        "mision": "Ser el epicentro de la articulación juvenil del Norte de Antioquia, liderando procesos de participación, formación y desarrollo que posicionen a Yarumal como capital juvenil de la subregión.",
        "vision": "En 2028, consolidar a Yarumal como la ciudad de los jóvenes líderes del Norte de Antioquia, con una política pública robusta y un tejido organizativo juvenil sólido.",
        "objetivos": [
            "Articular la agenda juvenil regional desde Yarumal como municipio cabecera.",
            "Promover el acceso a educación superior y técnica de calidad.",
            "Fortalecer el ecosistema emprendedor juvenil con acceso a crédito y mentoría.",
            "Consolidar el Encuentro Regional CMJ como evento anual de referencia.",
        ],
        "redes": {"instagram": "@cmjarumal", "tiktok": "@cmjyarumal", "facebook": "CMJ Yarumal Oficial"},
    },
}

def build_cmj_block(data: dict) -> str:
    redes = data.get("redes", {})
    redes_lines = []
    if redes.get("facebook"):
        redes_lines.append(f'          facebook: "{redes["facebook"]}",')
    if redes.get("instagram"):
        redes_lines.append(f'          instagram: "{redes["instagram"]}",')
    if redes.get("tiktok"):
        redes_lines.append(f'          tiktok: "{redes["tiktok"]}",')

    objetivos = data["objetivos"]
    obj_lines = "\n".join([f'          "{o}",' for o in objetivos])

    redes_block = ""
    if redes_lines:
        redes_block = "        redes: {\n" + "\n".join(redes_lines) + "\n        },\n"

    return f'''    cmj: {{
      periodo: "{data["periodo"]}",
      fechaPosesion: "{data["fechaPosesion"]}",
      normaLegal: "{data["normaLegal"]}",
      numeroCurules: {data["numeroCurules"]},
      mision:
        "{data["mision"]}",
      vision:
        "{data["vision"]}",
      objetivos: [
{obj_lines}
      ],
{redes_block}    }},'''


with open(DATA_FILE, "r", encoding="utf-8") as f:
    content = f.read()

# Check if already patched
if "cmj: {" in content:
    print("Already patched — skipping.")
else:
    # For each municipality, find its region line and insert the cmj block after it
    for slug, cmj_data in CMJ_DATA.items():
        cmj_block = build_cmj_block(cmj_data)
        # The line we look for just before integrantes, unique per municipality context
        # We use the pattern: region line followed by \n    integrantes:
        content = content.replace(
            '    region: "Norte de Antioquia",\n    integrantes:',
            f'    region: "Norte de Antioquia",\n{cmj_block}\n    integrantes:',
            1  # Replace only the first occurrence each iteration
        )

    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Patched {len(CMJ_DATA)} municipalities successfully.")
