# DIVIMA
Digital visitor management

# Business description
For our customers in public objects, facilities and at events

The Be Secure GmbH is the competent and experienced specialist for security services in objects, facilities, events and more.

The company started its work under the name Be Secure GmbH with effect from October 1, 2008 and quickly met the increasing importance of the topic of security from the customer's point of view and the higher demands on security management.
At eight locations the meanwhile more than 250 security personnel are on duty in Berlin, Brandenburg and Sachsen.

As a security service provider, we create comprehensive and needs-based concepts, derive personnel, technical and organizational measures from them and implement them.

Be Secure GmbH attaches great importance to well-qualified personnel, modern and innovative processes, efficient communication with our customers and within our growing company as well as compliance with personal and data protection regulations. 

Our field of activity essentially comprises three areas:
- Security-Consulting
- Services for objects and facilities
- Services at events

The focus is on a sustainable cooperation with our customers.

# Description of the order
Be Secure GmbH provides a high level of objective security, protection against unwanted access and thus protection against damage through its presence and professional approach. By objects we understand areas worthy of protection, which partly represent operation-critical infrastructural facilities or house valuable goods. These include, for example, office buildings or building complexes, industrial plants, construction sites and others. These objects are protected against vandalism, sabotage and theft. 

In this context, gate services also are within our scope of duties, which includes the admission and documentation of visitors as well as the allocation of keys or parking spaces. In the process, a lot of documents accumulate over a longer period of time, which have to be archived. In addition, the entry in visitor lists, in which previous visitors can be viewed, is questionable from a data protection perspective.(In the future, we would like to have a digital signing process for this service. However, this is not part of this order but the basis for further developments.) 

During digitization, we would therefore like to develop a WebApp that can be used to manage visitor management and the allocation of visitor cards, keys and parking spaces. For this purpose, different types of visits (such as internal, external and service providers) should be able to be created. Optionally, a key and/or a parking space can be assigned to a visitor. These should be able to be created separately. In this order, for now only a version for our own branch offices is to be implemented.

As name of the application we have chosen the name DIVIMA (Digital visitor management). This should be callable under the domain https://bs-divima.com/.

# Description of the functions
---> Visitors:

The following functions are to be implemented for a visit:
- create, sign out (when the guest leaves the object), edit, view, delete
- when creating a visit, a checkbox "Get signature" should be activated by the user
- if a key has been assigned, a checkbox "Key returned" should be activated by the user when logging out 

There are three types of visits: 
- internal visitors, external visitors and service providers (such as suppliers and craftsmen).

Each visit has the following attributes:
- Location of the visit
(Berlin Central, Berlin South, Berlin West, Chemnitz, Cottbus, Dresden, Leipzig, Potsdam)
- Visitor ID
- Type of visit
- Short description (title) of the visit
- Name of the visitor
- Date of the visit
- Time of arrival (create) and departure (sign out)
- Parking place (optional)

Attributes for internal visitors:
- assigned branch office
(Berlin Central, Berlin South, Berlin West, Chemnitz, Cottbus, Dresden, Leipzig, Potsdam) 
- Key (optional)

Attributes for external visitors:
- Name of the company
- visitors email address

Attributes for service providers
- Name of the company
- Key (optional)

---> Key: 

The following functions should be implemented for a key:
- create, edit, view, delete

A key has the following attributes:
- Key ID
- key name 
- short description (title) of the assigned visit if the key is currently issued
(in the visitor list, the key title should be documented even after the sign out, if possible)

---> Parking lot:

The following functions are to be implemented for a parking lot:
- create, edit, view, delete

A parking lot has the following attributes:
- Parking lot ID
- Parking lot name
- Short description (title) of the visit, if currently issued
