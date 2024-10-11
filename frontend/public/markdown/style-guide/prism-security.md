# > Prism Security

## Functional Security

In order to have access to the Data Catalog, users must be in either a > Prism Access Security Group or a > Prism Dataset Role.

### User-Based Security Groups

First, create your user-based security groups that should have access to > Prism. 

- > Prism Administrator
- > Prism Data Writer
- Accounting Center Administrator
- Accounting Center Analyst

### > Prism Access Security Groups

It is recommended that a 1:1 relationship exists between an User-Based Security Group and a > Prism Access Security Group. This is equivalent to unconstrained access.

- > Prism Administrator (> Prism Access)
- Accounting Center Administrator (> Prism Access)
- > Prism Data Editor (> Prism Access)
- Accounting Center Analyst (> Prism Access)

### Assignable Roles

There are six default roles for > Prism. These should be used to limit the data viewed/edited by users.

| Role Name            | Self-Assign | Role Assignees Restricted to | Assigned/Reviewed by Security Group |
| -------------------- | :---------: | ---------------------------- | ----------------------------------- |
| > Prism Dataset Owner  | ✅         | Accounting Center Administrator \| Accounting Center Analyst \| > Prism Data Administrator \| > Prism Data Viewer | > Prism Data Administrator \| > Prism Dataset Owner (Workday Owned) \| Security Administrator |
| > Prism Dataset Editor |            | Accounting Center Administrator \| Accounting Center Analyst \| > Prism Data Administrator \| > Prism Data Viewer | > Prism Data Administrator \| > Prism Dataset Owner (Workday Owned) \| Security Administrator |
| > Prism Dataset Viewer |            | Accounting Center Administrator \| Accounting Center Analyst \| > Prism Data Administrator \| > Prism Data Viewer | > Prism Data Administrator \| > Prism Dataset Owner (Workday Owned) \| Security Administrator |
| > Prism Table Owner    | ✅         | Accounting Center Administrator \| Accounting Center Analyst \| > Prism Data Administrator \| > Prism Data Viewer | > Prism Data Administrator \| > Prism Dataset Owner (Workday Owned) \| Security Administrator |
| > Prism Table Editor   |            | Accounting Center Administrator \| Accounting Center Analyst \| > Prism Data Administrator \| > Prism Data Viewer | > Prism Data Administrator \| > Prism Dataset Owner (Workday Owned) \| Security Administrator |
| > Prism Table Viewer   |            | Accounting Center Administrator \| Accounting Center Analyst \| > Prism Data Administrator \| > Prism Data Viewer | > Prism Data Administrator \| > Prism Dataset Owner (Workday Owned) \| Security Administrator |

### Role-Based Security Groups (Constrained)

To assign users to the roles above, create the following Role-Based Security Groups. You do not need to create similar roles for Owners or Tables (unless desired).

| Security Group                  | Assignable Role | Access Rights to Organizations |
| ------------------------------- | --------------- | ------------------------------ |
| > Prism Data Editor (Constrained) | > Prism Dataset Editor | Applies To Current And Unassigned Subordinates |
| > Prism Data Viewer (Constrained) | > Prism Dataset Viewer | Applies To Current And Unassigned Subordinates |

### Security Domains

Finally, we have 3 different domain permission patterns to apply for the > Prism Analytics Functional Area:

**Pattern I**

> Prism: Delete Table Data\
> Prism: Insert Table Data\
> Prism: Manage Data Source\
> Prism: Select Table Data\
> Prism: Tables Manage\
> Prism: Tables Manage Schema\
> Prism: Tables Owner Manage\
> Prism: Truncate Table Data\
> Prism: Update Table Data\
> Prism Datasets: Manage\
> Prism Datasets: Owner Manage\
> Prism Datasets: Publish
> 
> | Security Groups                    | View | Modify |
> | ---------------------------------- | :--: | :----: |
> | Prism Administrator (Prism Access) | ✅  | ✅     |
> | Prism Data Editor (Prism Access)   | ✅  | ✅     |
> | Prism Data Viewer (Constrained)    | ✅  |        |

**Pattern II**

> Prism: Tables Create\
> Prism Datasets: Create
> 
> | Security Groups                                | View | Modify |
> | ---------------------------------------------- | :--: | :----: |
> | Prism Administrator (Prism Access)             | ✅  | ✅     |
> | Prism Data Editor (Prism Access)               | ✅  | ✅     |
> | Accounting Center Administrator (Prism Access) | ✅  | ✅     |
> | Accounting Center Analyst (Prism Access)       | ✅  | ✅     |

#### Pattern III

> Prism: Manage Connection\
> Prism: Manage File Containers\
> Prism: Manage Manage Relax Sharing

| Security Groups                                | View | Modify |
| ---------------------------------------------- | :--: | :----: |
| Prism Administrator (> Prism Access)             | ✅  | ✅     |
| Prism Data Editor (> Prism Access)               | ✅  | ✅     |
| Accounting Center Administrator (> Prism Access) | ✅  | ✅     |
| Accounting Center Analyst (> Prism Access)       | ✅  | ✅     |

If set up this way, 

**NEXT LEVEL** [Partitioned Administrator Security](https://collaborate.workday.com/t5/General/> Prism-Contributed-Solution-Partitioned-Administrator-Security/ta-p/1252093)


## Table/Dataset Sharing

**Helpful Task:** Edit Accounting Source > Prism Role Assignments

## Reporting Security

