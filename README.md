# Nuxeo Online Services (NOS) Servers

[![Build Status](https://travis-ci.org/mnixo/nos-servers.svg?branch=master)](https://travis-ci.org/mnixo/nos-servers)

[Try it here!](https://mnixo.github.io/nos-servers/)

### Features

- Comprehensive list view of the configured NOS instances.
- For each configured NOS instance:
  - Basis status: offline or online (with ping RTT).
  - Easy navigation to:
    - Nuxeo Connect dashboard.
    - Nuxeo JSF backend.
    - Nuxeo Studio Modeler & Designer (directly to a specific project).
- Configuration:
  - Fully customizable JSON.
  - Stored in the browser's local storage.
  - By default includes Production and Pre-production instances.

### Configuration

To customize your configuration click the cogwheel icon on the top right.

The configuration is stored in a JSON array, in which each element represents a NOS instance.
Each of these instances must have the following fields: 
- `label`: A simple string with a name or something that identifies the instance in the list view.
- `url`: The base URL to the instance (must be `https`!).

Additionally, instances can also have a `studioProjects` field that holds an array of IDs (strings) of the preferred Nuxeo Studio projects.

For example, a valid configuration would be:

```
[
  {
    "label": "Production",
    "url": "https://connect.nuxeo.com",
    "studioProjects": [
      "nuxeo-connect",
      "nuxeo-university"
    ]
  }
]
```

This configuration lists only a single NOS instance with the label `Production`.
The links of this instance will all be based on `https://connect.nuxeo.com`.
Also, when choosing to navigate to Nuxeo Studio (via Modeler or Designer), the user will have the option to choose between the `nuxeo-connect` or the `nuxeo-university` projects.

The order of the listed instances and listed preferred Studio projects are kept the same as they are defined in the configuration. 

You can revert to the default configuration at any time by clicking the `RESET` button on the bottom left of the `Edit Configuration` dialog.
