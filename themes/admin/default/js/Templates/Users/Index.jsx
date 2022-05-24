import React, {useEffect, useState} from 'react';
import {
    Badge,
    Button,
    Card,
    Col,
    Form,
    InputGroup,
    Modal,
    OverlayTrigger,
    Pagination,
    Row,
    Table,
    Tooltip
} from 'react-bootstrap';
import {AlertTriangle, ChevronDown, ChevronsUpDown, ChevronUp, Edit, Search, Trash} from 'lucide-react';
import {Link, usePage} from '@inertiajs/inertia-react';
import {Inertia} from '@inertiajs/inertia';
import {route} from '../../utils/route';
import {useDebounce} from 'use-debounce';
import {useLimitState, useSearchState, useSortState} from '../../hooks/useSearchParamsState';
import PageWrapper from '../../Components/PageWrapper';
import PropTypes from 'prop-types';

function SortIcon({sort, column}) {
    if (column in sort) {
        if (sort[column]) {
            return <ChevronDown className="icon icon-sm me-1"/>;
        } else {
            return <ChevronUp className="icon icon-sm me-1"/>;
        }
    }

    return <ChevronsUpDown className="icon icon-sm me-1"/>;
}

function ConfirmModal({user, onHide, onConfirm}) {
    if (! user) {
        return;
    }

    return (
        <Modal size="sm" onHide={onHide} show centered>
            <div className="modal-status bg-danger"/>
            <Modal.Body className="text-center py-4">
                <AlertTriangle className="mb-2 text-danger icon icon-lg"/>
                <div className="h3">Are you sure ?</div>
                <div className="text-muted">Do you really want to delete {user.full_name} ?</div>
            </Modal.Body>
            <Modal.Footer>
                <div className="w-100">
                    <Row>
                        <Col>
                            <Button variant="light" className="w-100" onClick={() => onHide()}>Cancel</Button>
                        </Col>
                        <Col>
                            <Button variant="danger" className="w-100" onClick={() => onConfirm(user)}>Confirm</Button>
                        </Col>
                    </Row>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

function Index({paginator}) {
    const [initialized, setInitialized] = useState(false);
    const [sort, setSort] = useSortState();
    const [search, setSearch] = useSearchState();
    const [searchDebounced] = useDebounce(search, 300);
    const [limit, setLimit] = useLimitState();
    const [userConfirmation, setUserConfirmation] = useState(null);
    const {auth} = usePage().props;

    function toggleSort(event, column) {
        event.preventDefault();

        setSort(function (origin) {
            if (column in origin) {
                if (origin[column]) {
                    delete origin[column];
                } else {
                    origin[column] = true;
                }
            } else {
                origin[column] = false;
            }

            return {...origin};
        });
    }

    function buildRequestData() {
        const data = {};

        if (Object.keys(sort).length > 0) {
            data.sort = Object
                .entries(sort)
                .map(([column, isDesc]) => (isDesc ? '-' : '') + column)
                .filter((column) => column !== '')
                .join(',');
        }

        if (search.length > 0) {
            data.filter = {
                search
            };
        }

        if (limit !== 10) {
            data.limit = limit;
        }

        return data;
    }

    function userDeleteConfirmed(user) {
        setUserConfirmation(null);

        Inertia.visit(route('admin::users.destroy', {user}), {
            preserveScroll: true,
            preserveState: true,
            only: ['paginator', 'toast'],
            method: 'delete'
        });
    }

    useEffect(() => {
        if (! initialized) {
            return;
        }

        Inertia.visit(route('admin::users.index'), {
            data: buildRequestData(),
            preserveScroll: true,
            preserveState: true,
            only: ['paginator', 'toast']
        });
    }, [sort, searchDebounced, limit]);

    useEffect(() => {
        if (initialized) {
            return;
        }

        setInitialized(true);
    }, [initialized]);

    return (
        <PageWrapper>
            <>
                <Card>
                    <Card.Body className="border-bottom py-3">
                        <div className="d-flex">
                            <div className="text-muted">
                                <div className="d-inline-block">
                                    <Form.Group controlId="search">
                                        <Form.Label className="visually-hidden-focusable">Search</Form.Label>
                                        <InputGroup className="input-group-flat" size="sm">
                                            <InputGroup.Text>
                                                <Search className="icon icon-sm"/>
                                            </InputGroup.Text>
                                            <Form.Control placeholder="Search..."
                                                          value={search}
                                                          onChange={(event) => setSearch(event.target.value)}/>
                                        </InputGroup>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="text-muted ms-auto">
                                <div className="d-inline-block">
                                    <Form.Group controlId="limit">
                                        <Form.Label className="visually-hidden-focusable">Users per page</Form.Label>
                                        <Form.Select size="sm"
                                                     value={limit}
                                                     onChange={(event) => setLimit(parseInt(event.target.value))}>
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                    <Table className="table-vcenter card-table" responsive>
                        <thead>
                            <tr>
                                <th>
                                    <Link href="#" onClick={(event) => toggleSort(event, 'name')}>
                                        <SortIcon sort={sort} column="name"/>
                                        Name
                                    </Link>
                                </th>
                                <th>Role</th>
                                <th>
                                    <Link href="#" onClick={(event) => toggleSort(event, 'created_at')}>
                                        <SortIcon sort={sort} column="created_at"/>
                                        Created at
                                    </Link>
                                </th>
                                <th>
                                    <Link href="#" onClick={(event) => toggleSort(event, 'updated_at')}>
                                        <SortIcon sort={sort} column="updated_at"/>
                                        Updated at
                                    </Link>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginator.data.map((user) => (
                                <tr key={`paginator-users-${user.id}`}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img src={user.thumb_avatar_url}
                                                 alt={`${user.full_name}'s avatar`}
                                                 className="avatar me-2"/>
                                            <div className="flex-fill">
                                                <div className="font-weight-medium">{user.full_name}</div>
                                                <div className="text-muted">
                                                    <OverlayTrigger overlay={<Tooltip>{user.email_verified_at
                                                        ? 'Verified email'
                                                        : 'Not verified email'}</Tooltip>}>
                                                        <div className="d-inline-block">
                                                            <span className={
                                                                `badge me-1 bg-${user.email_verified_at
                                                                    ? 'success'
                                                                    : 'danger'}`
                                                            }/>
                                                            {user.email}
                                                        </div>
                                                    </OverlayTrigger>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user.roles.map((role, index) => (
                                            <Badge bg=""
                                                   style={{backgroundColor: role.color}}
                                                   key={`user-${user.id}-role-${index}`}
                                                   pill>
                                                {role.name}
                                            </Badge>
                                        ))}
                                    </td>
                                    <td>{user.formatted_created_at}</td>
                                    <td>{user.formatted_updated_at}</td>
                                    <td className="text-end">
                                        {/*{! user.email_verified_at && (*/}
                                        {/*    <OverlayTrigger overlay={<Tooltip>Resend email verification</Tooltip>}>*/}
                                        {/*        <Link href={route('admin::user.sendEmailVerification', {user})}*/}
                                        {/*              className="btn btn-icon btn-link"*/}
                                        {/*              as="button"*/}
                                        {/*              method="post">*/}
                                        {/*            <Send className="icon"/>*/}
                                        {/*        </Link>*/}
                                        {/*    </OverlayTrigger>*/}
                                        {/*)}*/}
                                        {auth.id !== user.id && (
                                            <>
                                                <OverlayTrigger overlay={<Tooltip>Edit {user.full_name}</Tooltip>}>
                                                    <Link href={route('admin::users.edit', {user})}
                                                          className="btn btn-icon btn-link">
                                                        <Edit className="icon"/>
                                                    </Link>
                                                </OverlayTrigger>
                                                <OverlayTrigger overlay={<Tooltip>Delete {user.full_name}</Tooltip>}>
                                                    <Button variant="link"
                                                            className="btn-icon"
                                                            onClick={() => setUserConfirmation(user)}>
                                                        <Trash className="icon text-danger"/>
                                                    </Button>
                                                </OverlayTrigger>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Card.Footer className="d-flex align-items-center">
                        <div className="m-0 text-muted">
                            Showing {paginator.from} to {paginator.to} of {paginator.total}
                        </div>
                        <Pagination className="m-0 ms-auto">
                            {paginator.links.map((link, index) => (
                                <li className={
                                    `page-item${link.active ? ' active' : ''}${link.url === null ? ' disabled' : ''}`
                                }
                                    key={`paginator-users-page-${index}`}>
                                    <Link href={link.url}
                                          data={buildRequestData()}
                                          preserveState={true}
                                          className="page-link"
                                          dangerouslySetInnerHTML={{__html: link.label}}/>
                                </li>
                            ))}
                        </Pagination>
                    </Card.Footer>
                </Card>
                {userConfirmation && (
                    <ConfirmModal user={userConfirmation}
                                  onHide={() => setUserConfirmation(null)}
                                  onConfirm={(user) => userDeleteConfirmed(user)}/>
                )}
            </>
        </PageWrapper>
    );
}

SortIcon.propTypes = {
    sort: PropTypes.object.isRequired,
    column: PropTypes.string.isRequired
};

ConfirmModal.propTypes = {
    user: PropTypes.object.isRequired,
    onHide: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
};

export default Index;
