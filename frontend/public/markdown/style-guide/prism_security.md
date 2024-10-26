# Prism Security

## Functional Security

In order to have access to the Data Catalog, which is the entry point to all things Prism, users must be in either a Prism Access Security Group or a Prism Dataset Role. If you follow the guide below, you will have Prism Administrators & Accounting Center Administrators that can see and do everything related to Prism. While, Prism Data Writers & Accounting Center Analysts can create their own objects, but they must be granted access to others' objects.

### User-Based Security Groups

First, create your `User-Based Security Groups` that should have access to Prism:

- Prism Administrator
- Prism Data Writer
- Accounting Center Administrator
- Accounting Center Analyst

### Prism Access Security Groups

It is recommended that a 1:1 relationship exists between an User-Based Security Group and a `Prism Access Security Group`. This is equivalent to unconstrained access.

- Prism Administrator (Prism Access)
- Accounting Center Administrator (Prism Access)
- Prism Data Editor (Prism Access)
- Accounting Center Analyst (Prism Access)

### Assignable Roles

Now we start reigning in on access by creating `Assignable Roles`. There are six default roles for Prism, ensure they are configured like this:

| Role Name            | Self-Assign | Role Assignees Restricted to | Assigned/Reviewed by Security Group |
| -------------------- | :---------: | ---------------------------- | ----------------------------------- |
| Prism Dataset Owner  | ✅         | Accounting Center Administrator \| Accounting Center Analyst \| Prism Data Administrator \| Prism Data Viewer | Prism Data Administrator \| Prism Dataset Owner (Workday Owned) \| Security Administrator |
| Prism Dataset Editor |            | Accounting Center Administrator \| Accounting Center Analyst \| Prism Data Administrator \| Prism Data Viewer | Prism Data Administrator \| Prism Dataset Owner (Workday Owned) \| Security Administrator |
| Prism Dataset Viewer |            | Accounting Center Administrator \| Accounting Center Analyst \| Prism Data Administrator \| Prism Data Viewer | Prism Data Administrator \| Prism Dataset Owner (Workday Owned) \| Security Administrator |
| Prism Table Owner    | ✅         | Accounting Center Administrator \| Accounting Center Analyst \| Prism Data Administrator \| Prism Data Viewer | Prism Data Administrator \| Prism Dataset Owner (Workday Owned) \| Security Administrator |
| Prism Table Editor   |            | Accounting Center Administrator \| Accounting Center Analyst \| Prism Data Administrator \| Prism Data Viewer | Prism Data Administrator \| Prism Dataset Owner (Workday Owned) \| Security Administrator |
| Prism Table Viewer   |            | Accounting Center Administrator \| Accounting Center Analyst \| Prism Data Administrator \| Prism Data Viewer | Prism Data Administrator \| Prism Dataset Owner (Workday Owned) \| Security Administrator |

### Role-Based Security Groups (Constrained)

To assign users to the roles above, create the following `Role-Based Security Groups`. You _do not_ need to create similar roles for Owners or Tables.

| Security Group                  | Assignable Role | Access Rights to Organizations |
| ------------------------------- | --------------- | ------------------------------ |
| Prism Data Editor (Constrained) | Prism Dataset Editor | Applies To Current And Unassigned Subordinates |
| Prism Data Viewer (Constrained) | Prism Dataset Viewer | Applies To Current And Unassigned Subordinates |

### Security Domains

Finally, we have 3 different domain permission patterns to apply for the Prism Analytics Functional Area:

**Pattern I**

Prism: Delete Table Data\
Prism: Insert Table Data\
Prism: Manage Data Source\
Prism: Select Table Data\
Prism: Tables Manage\
Prism: Tables Manage Schema\
Prism: Tables Owner Manage\
Prism: Truncate Table Data\
Prism: Update Table Data\
Prism Datasets: Manage\
Prism Datasets: Owner Manage\
Prism Datasets: Publish

| Security Groups                    | View | Modify |
| ---------------------------------- | :--: | :----: |
| Prism Administrator (Prism Access) | ✅  | ✅     |
| Prism Data Editor (Prism Access)   | ✅  | ✅     |
| Prism Data Viewer (Constrained)    | ✅  |        |

**Pattern II**

Prism: Tables Create\
Prism Datasets: Create

| Security Groups                                | View | Modify |
| ---------------------------------------------- | :--: | :----: |
| Prism Administrator (Prism Access)             | ✅  | ✅     |
| Prism Data Editor (Prism Access)               | ✅  | ✅     |
| Accounting Center Administrator (Prism Access) | ✅  | ✅     |
| Accounting Center Analyst (Prism Access)       | ✅  | ✅     |

#### Pattern III

Prism: Manage Connection\
Prism: Manage File Containers\
Prism: Manage Manage Relax Sharing

| Security Groups                                | View | Modify |
| ---------------------------------------------- | :--: | :----: |
| Prism Administrator (Prism Access)             | ✅  | ✅     |
| Prism Data Editor (Prism Access)               | ✅  | ✅     |
| Accounting Center Administrator (Prism Access) | ✅  | ✅     |
| Accounting Center Analyst (Prism Access)       | ✅  | ✅     |

Don't forget to `Activate Pending Security Policies`. Once that is done, add your workers to the applicable group. Now people are able to get into the Data Catalog.

If other functional areas use Prism for their reporting needs, it may be beneficial to also segment out those teams and create complementary security groups like Accounting Center. For example, if your Vendor Management Team uses Prism, create a Prism Access Security Group and other security elements for Supplier Administrators and Supplier Analysts. If you do this, you may want to consider **NEXT LEVEL** [Partitioned Administrator Security](https://collaborate.workday.com/t5/General/Prism-Contributed-Solution-Partitioned-Administrator-Security/ta-p/1252093).


## Table/Dataset Sharing

Our functional security is set up in a manner that ownership and sharing permissions are tightly controlled. Whomever creates an object now in Prism, owns it. In order for others to see or edit it, they must be granted access by an administrator or the owner themselves. 

To share a table or dataset, use the related actions from the object you want to edit. From the Security option, choose `Edit Dataset Sharing` or `Edit Table Sharing`. From there, change the owner or choose who can view or edit the object.

As this is completed, Accounting Center Analysts and Prism Data Writers will see the objects in their Data Catalog grow. 

Luckily for the Accounting Center area, there is a task `Edit Accounting Source Prism Role Assignments` that easily applies the desired security to the Accounting Source.

## Report/Data Source Security

Once we set up our functional security and sharing, and build our first Prism pipeline, we need to share our work with non-Prism users.

## Custom Domain Security

Can't find a good delivered domain to use? Workday permits up to 150 Custom Domains to be in use.  