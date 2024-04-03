import PyPDF2
import docx2txt

# Open the PDF file in binary mode
with open('/Users/luisbarajas/Downloads/resumeivan.pdf', 'rb') as file:
    # Create a PDF reader object
    reader = PyPDF2.PdfReader(file)
    
    # Printing number of pages in the PDF file
    print("Number of pages:", len(reader.pages))
    
    # Getting a specific page from the PDF file (zero-indexed)
    page = reader.pages[0]
    
    # Extracting text from the page
    text = page.extract_text()
    print(text)


path = '/Users/luisbarajas/Downloads/situationroom.docx'
text =  docx2txt.process(path)
print(text) 